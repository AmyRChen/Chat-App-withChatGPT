import React, { useState } from "react";
import {
  XMarkIcon,
  PaperClipIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import Dropzone from "react-dropzone";

const MessageFormUI = ({
  setAttachment,
  message,
  // Passing different handleSubmit depending on the component
  handleChange,
  handleSubmit,
  appendText,
  handleKeyDown,
}) => {
  const [preview, setPreview] = useState("");

  return (
    <div className="message-form-container">
      {/*Preview Section */}
      {preview && (
        <div className="message-form-preview">
          <img
            src={preview}
            alt="message-form-preview-image"
            //onLoad helps frees up resources when don't need the image anymore.
            onLoad={() => URL.revokeObjectURL(preview)}
            className="message-form-preview-image"
          />
          <XMarkIcon
            className="message-form-icon-x"
            onClick={() => {
              setPreview("");
              setAttachment("");
            }}
          />
        </div>
      )}
      <div className="message-form">
        <div className="message-form-input-container">
          <input
            className="message-form-input"
            type="text"
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
          />
          {appendText && (
            <input
              type="text"
              className="message-form-assist"
              disabled="disabled"
              value={`${message} ${appendText}`}
            />
          )}
        </div>
        <div className="message-form-icons">
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            noClick={true}
            onDrop={(acceptedFile) => {
              setAttachment(acceptedFile[0]);
              setPreview(URL.createObjectURL(acceptedFile[0]));
            }}
          >
            {({ getRootProps, getInputProps, open }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <PaperClipIcon
                  className="message-form-icon-clip"
                  onClick={open}
                />
              </div>
            )}
          </Dropzone>

          <hr className="vertical-line" />
          <PaperAirplaneIcon
            className="message-form-icon-airplane"
            onClick={() => {
              //Clear up preview once click submit
              setPreview("");
              handleSubmit();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MessageFormUI;
