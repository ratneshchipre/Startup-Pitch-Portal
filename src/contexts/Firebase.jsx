import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    onAuthStateChanged,
    signOut,
    updateProfile,
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    addDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";

const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyDNb1aS2ZBTHeWftOSdeHcPZyb149KrHEk",
    authDomain: "startup-pitch-portal.firebaseapp.com",
    projectId: "startup-pitch-portal",
    storageBucket: "startup-pitch-portal.appspot.com",
    messagingSenderId: "428561967266",
    appId: "1:428561967266:web:f173dec8cfee0f8286cffb",
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

// Utility: Detect mobile device
const isMobile = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export const FirebaseProvider = (props) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user || null);
            setLoading(false);
        });
    }, []);

    // 🔁 Run only on redirect back from Google (mobile)
    useEffect(() => {
        getRedirectResult(auth).then(async (result) => {
            if (result) {
                const user = result.user;
                const role = sessionStorage.getItem("choice");
                const navigateTo = sessionStorage.getItem("redirectTo");

                if (!role || !navigateTo) {
                    alert("Missing role or redirect path. Please sign up again.");
                    await signOut(auth);
                    return;
                }

                await handleUserAfterGoogleSignup(user, role, navigateTo);
            }
        });
    }, []);

    // 🔁 Shared logic for new Google user
    const handleUserAfterGoogleSignup = async (user, role, navigate) => {
        const founderRef = doc(firestore, "Founder", user.uid);
        const investorRef = doc(firestore, "Investor", user.uid);

        const [founderSnap, investorSnap] = await Promise.all([
            getDoc(founderRef),
            getDoc(investorRef),
        ]);

        if (
            (role === "Founder" && investorSnap.exists()) ||
            (role === "Investor" && founderSnap.exists())
        ) {
            alert(
                `This Gmail is already registered as a ${role === "Founder" ? "Investor" : "Founder"}. Please log in instead.`
            );
            await user.delete();
            await signOut(auth);
            return;
        }

        const roleRef = doc(firestore, role, user.uid);
        const roleSnap = await getDoc(roleRef);

        if (roleSnap.exists()) {
            alert("You already have an account.");
            navigate("/");
        } else {
            const nameParts = user.displayName?.split(" ") || [];
            const userData = {
                uid: user.uid,
                email: user.email,
                name: nameParts[0] || "",
                lastName: nameParts.slice(1).join(" ") || "",
                photoURL: user.photoURL,
                role: role,
                createdAt: new Date().toISOString(),
                provider: "google",
            };

            await setDoc(roleRef, userData);
            alert("Signup successful!");
            navigate(`/account/${role.toLowerCase()}/profile`);
        }
    };

    const signupUserWithEmailAndPassword = async (
        email,
        password,
        name,
        lastName,
        navigate
    ) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: `${name} ${lastName}`,
            });

            const role = JSON.parse(localStorage.getItem("form"))?.role1;
            if (!role) {
                alert("Please select a role before signing up.");
                return;
            }

            const userRef = doc(firestore, role, user.uid);
            const userData = {
                uid: user.uid,
                email,
                name,
                lastName,
                role,
                createdAt: new Date().toISOString(),
                provider: "email",
                password,
            };

            await setDoc(userRef, userData);
            alert("Signup successful!");
            navigate(`/account/${role.toLowerCase()}/profile`);
        } catch (error) {
            console.error("Signup Error:", error);
            alert(error.message);
        }
    };

    const signinUserWithEmailAndPass = async (email, password) => {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const user = result.user;

        const founderRef = doc(firestore, "Founder", user.uid);
        const investorRef = doc(firestore, "Investor", user.uid);

        const [founderSnap, investorSnap] = await Promise.all([
            getDoc(founderRef),
            getDoc(investorSnap),
        ]);

        if (founderSnap.exists()) {
            return { user, role: "Founder" };
        } else if (investorSnap.exists()) {
            return { user, role: "Investor" };
        } else {
            throw new Error(
                "User not found in either Founder or Investor collections."
            );
        }
    };

    const signupWithGoogle = async (navigate, role) => {
        try {
            sessionStorage.setItem("choice", role);
            sessionStorage.setItem("redirectTo", navigate); // you might update this to a route string

            if (isMobile()) {
                await signInWithRedirect(auth, googleProvider);
            } else {
                const result = await signInWithPopup(auth, googleProvider);
                const user = result.user;
                await handleUserAfterGoogleSignup(user, role, navigate);
            }
        } catch (error) {
            console.error("Google Signup Error:", error);
            alert("Something went wrong during Google signup.");
        }
    };

    const signinWithGoogle = async (role, navigate) => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            const founderSnap = await getDoc(doc(firestore, "Founder", user.uid));
            const investorSnap = await getDoc(doc(firestore, "Investor", user.uid));

            if (founderSnap.exists()) {
                alert("Login successful!");
                navigate(`/account/founder/profile`);
            } else if (investorSnap.exists()) {
                alert("Login successful!");
                navigate(`/account/investor/profile`);
            } else {
                await user.delete();
                await signOut(auth);
                alert("You are not registered. Please sign up first.");
                navigate("/");
            }
        } catch (error) {
            console.error("Google Sign-In Error:", error);
            alert("Sign-in failed.");
        }
    };

    const handleCreateNewPitch = async (
        pitch,
        PitchDetails,
        category,
        funding_goal,
        tags
    ) => {
        const tagArray =
            typeof tags === "string"
                ? tags.split(",").map((tag) => tag.trim()).filter(Boolean)
                : Array.isArray(tags)
                    ? tags
                    : [];

        await addDoc(collection(firestore, "Pitchs"), {
            pitch,
            PitchDetails,
            category,
            funding_goal,
            tags: tagArray,
            userID: user.uid,
            userEmail: user.email,
            diaplayName: user.displayName,
            photoURL: user.photoURL,
        });
    };

    const fetchMyPitch = async (uid) => {
        const collectionRef = collection(firestore, "Founder");
        const q = query(collectionRef, where("uid", "==", uid));
        const result = await getDoc(q);
        return result;
    };

    const listAllPitchs = () => {
        return getDocs(collection(firestore, "Pitchs"));
    };

    const getPitchByID = async (id) => {
        const docRef = doc(firestore, "Pitchs", id);
        const result = await getDoc(docRef);
        return result;
    };

    const isLoggedIn = !!user;

    return (
        <FirebaseContext.Provider
            value={{
                signupUserWithEmailAndPassword,
                signinUserWithEmailAndPass,
                signupWithGoogle,
                signinWithGoogle,
                isLoggedIn,
                user,
                loading,
                handleCreateNewPitch,
                fetchMyPitch,
                listAllPitchs,
                getPitchByID,
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    );
};
