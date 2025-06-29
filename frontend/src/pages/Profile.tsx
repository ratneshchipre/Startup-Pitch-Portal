import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { countries } from "../countryList";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchUserData } from "../redux/slices/userData";
import axios from "axios";

type ProfileFormData = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  country: string;
  city: string;
  phone: string;
};

const Profile = () => {
  const userDataState = useAppSelector((state) => state.userData);
  const dispatch = useAppDispatch();
  const { role, userId } = useParams();
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    country: "",
    city: "",
    phone: "",
  });

  useEffect(() => {
    dispatch(fetchUserData({ role, userId }));
  }, [dispatch, role, userId]);

  useEffect(() => {
    if (userDataState.data) {
      setFormData({
        firstName: userDataState.data.firstName,
        lastName: userDataState.data.lastName,
        email: userDataState.data.email,
        address: userDataState.data.address || "",
        country: userDataState.data.country || "",
        city: userDataState.data.city || "",
        phone: userDataState.data.phone || "",
      });
    }
  }, [userDataState.data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUserProfileForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `/api/account/${role}/${userId}/update-data`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          address: formData.address,
          country: formData.country,
          city: formData.city,
          phone: formData.phone,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="w-full flex flex-col px-[2rem] py-[1rem]">
      <div className="pb-[2rem] mt-[4.6rem] mini-desktop:ml-[20rem]">
        <h1 className="font-Bold text-txt-black text-[1.6rem]">
          Personal Information
        </h1>
        <form
          onSubmit={handleUserProfileForm}
          className="mt-[1.4rem] flex flex-col bg-cream-white border-dash-border border-[2px] px-[1.5rem] py-[1.5rem] rounded-lg gap-[1.5rem]"
        >
          <div className="flex flex-col gap-[0.5rem]">
            <label className="font-Medium text-txt-black text-[1.2rem]">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="w-full bg-nav-white text-txt-gray-black font-Regular rounded-lg px-[0.8rem] py-[0.4rem] border-border border-[2px]"
            />
          </div>
          <div className="flex flex-col gap-[0.5rem]">
            <label className="font-Medium text-txt-black text-[1.2rem]">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="w-full bg-nav-white text-txt-gray-black font-Regular rounded-lg px-[0.8rem] py-[0.4rem] border-border border-[2px]"
            />
          </div>
          <div className="flex flex-col gap-[0.5rem]">
            <label className="font-Medium text-txt-black text-[1.2rem]">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full bg-nav-white text-txt-gray-black font-Regular rounded-lg px-[0.8rem] py-[0.4rem] border-border border-[2px]"
            />
          </div>
          <div className="flex flex-col gap-[0.5rem]">
            <label className="font-Medium text-txt-black text-[1.2rem]">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              className="w-full bg-nav-white text-txt-gray-black font-Regular rounded-lg px-[0.8rem] py-[0.4rem] border-border border-[2px]"
            />
          </div>
          <div className="flex flex-col gap-[0.5rem]">
            <label className="font-Medium text-txt-black text-[1.2rem]">
              Country
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleSelectChange}
              className="w-full bg-nav-white text-txt-gray-black font-Regular rounded-lg px-[0.8rem] py-[0.4rem] border-border border-[2px]"
            >
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-[0.5rem]">
            <label className="font-Medium text-txt-black text-[1.2rem]">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
              className="w-full bg-nav-white text-txt-gray-black font-Regular rounded-lg px-[0.8rem] py-[0.4rem] border-border border-[2px]"
            />
          </div>
          <div className="flex flex-col gap-[0.5rem]">
            <label className="font-Medium text-txt-black text-[1.2rem]">
              Phone (with country code)
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full bg-nav-white text-txt-gray-black font-Regular rounded-lg px-[0.8rem] py-[0.4rem] border-border border-[2px]"
            />
          </div>
          <button
            type="submit"
            className="font-Regular text-nav-white bg-btn-blue py-[0.4rem] text-[1.1rem] rounded-lg cursor-pointer hover:bg-hover-blue transition-all"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
