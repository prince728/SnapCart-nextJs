"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UserCog, User, Bike, ArrowRight } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";


function EditRoleMobile() {
  const [roles] = useState([
    { id: "admin", label: "Admin", icon: UserCog },
    { id: "user", label: "User", icon: User },
    { id: "deliveryBoy", label: "Delivery Boy", icon: Bike },
  ]);

  const [selectedRole, setSelectedRole] = useState("admin");
  const [mobile, setMobile] = useState("");
  const router = useRouter();


  const handleEdit = async () => {
    try{
      const result = await axios.post("/api/user/edit-role-mobile", {
        role: selectedRole,
        mobile: mobile
      });
      router.push("/");
    }catch(error){
      console.error("Error editing user role:", error);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen w-full px-4 py-5 bg-[#f4fcf6]">

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-extrabold text-green-700 text-center"
      >
        Select Your Role
      </motion.h1>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-5 mt-7">

        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.id;

          return (
            <motion.div
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              whileTap={{ scale: 0.96 }}
              className={`flex flex-col items-center justify-center
                w-[150px] h-[137px] rounded-xl border-2
                transition-all duration-300 cursor-pointer
                ${isSelected
                  ? "border-green-500 bg-[#d9f8e5] shadow-md"
                  : "border-gray-300 bg-white hover:border-green-400"
                }`}
            >
              <Icon size={19} strokeWidth={2} />

              <span className="text-sm text-gray-800 mt-1">
                {role.label}
              </span>
            </motion.div>
          );
        })}

      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex flex-col items-center mt-8"
      >
        <label
          htmlFor="mobile"
          className="text-sm text-gray-600 font-semibold mb-1"
        >
          Enter Your Mobile No.
        </label>

        <input
          type="tel"
          id="mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Enter your mobile number"
          maxLength={15}
          className="w-[250px] md:w-[252px] h-[43px]
            px-3 rounded-xl border-2 border-green-400
            bg-[#e8f0fe] text-gray-800 text-sm
            focus:ring-2 focus:ring-green-300
            focus:outline-none transition-all"
        />
      </motion.div>



      <motion.button
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.7,
        }}
        disabled={!selectedRole || mobile.length !== 10}
        onClick={handleEdit}
        className={`inline-flex items-center gap-2 font-semibold py-3 px-8 rounded-2xl shadow-md transition-all duration-200 w-[200px] mt-20 ${selectedRole && mobile.length === 10
            ? "bg-green-600 hover:bg-green-700 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
      >
        Go to Home
        <ArrowRight />
      </motion.button>



    </div>
  );
}

export default EditRoleMobile;
