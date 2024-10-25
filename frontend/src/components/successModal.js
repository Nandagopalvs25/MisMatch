import { FaRegCircleCheck } from "react-icons/fa6";

function SuccessModal({ message }) {
  return (
    <div
      className="flex fixed justify-center w-screen h-screen left-0 top-0 text-white items-center backdrop-blur-lg z-[1000]"
      data-aos="fade-in"
    >
      <div className="flex flex-col items-center gap-5 bg-gradient-to-r from-[#e35a5ad5] to-[#e2b7b7c5] p-10 rounded-3xl z-[1000]">
        <FaRegCircleCheck size={60} color="gr"/>
        {/* <CiCircleCheck /> */}

        <p>{message}</p>
      </div>
    </div>
  );
}

export default SuccessModal;
