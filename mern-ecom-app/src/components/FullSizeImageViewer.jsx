import { CgClose } from "react-icons/cg";

const FullSizeImageViewer = ({ imageUrl, onClose }) => {
  return (
    <div className="position-fixed top-0 bottom-0 mx-auto w-100 center-content" >
      <div
        className="bg-white shadow-lg rounded mx-auto position-relative"
        style={{ maxWidth: "64rem", maxHeight: "80vh", width: "100%", height: "auto" }}
      >
        <div className="w-100 cursor-pointer d-flex justify-content-end position-absolute py-1" onClick={onClose}>
          <CgClose size={25} />
        </div>
        <div className="center-content p-4" style={{ maxWidth: "80vw", height: "auto" }}>
          <img
            src={imageUrl}
            alt="Product Full Size Image"
            className=" object-fit-contain"
            style={{width: "1000px", height: "500px"}}
          />
        </div>
      </div>
    </div>
  );
};

export default FullSizeImageViewer;
