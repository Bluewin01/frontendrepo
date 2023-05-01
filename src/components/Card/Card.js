import React, { useState } from "react";
import "./_CardStyle.css";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

export const Card = (props) => {
  const { cardType } = props;
  const [isHovered, setisHovered] = useState(false);

  return (() => {
    switch (cardType) {
      case "createTemplate":
        const { createTemplate } = props;
        return (
          <div
            data-testid="createTemplate"
            className="card"
            onClick={createTemplate}
          >
            <div className="cardContent">
              <PlusOutlined className="iconDesign" />
            </div>
          </div>
        );
      case "templateList":
        const { template, buttons } = props;

        const ButtonSize = () => {
          const buttonSize = 160 / buttons.length;
          return buttonSize;
        };

        return (
          <div
            key={template.id}
            className="card"
            onMouseEnter={() => {
              setisHovered(true);
            }}
            onMouseLeave={() => {
              setisHovered(false);
            }}
          >
            <div
              className="cardContent"
              style={{
                display: isHovered ? "none" : "block",
              }}
            >
              {template.name}
            </div>
            <div
              className="hiddenButton"
              style={{
                display: isHovered ? "block" : "none",
              }}
            >
              {buttons.map((button) => {
                return (
                  <div
                    key={button.name}
                    data-testid="editTemplate"
                    onClick={() => {
                      button.onClick(template.id);
                    }}
                    className="cardButton"
                    style={{ height: `${ButtonSize()}px` }}
                  >
                    {button.name === "Edit" ? (
                      <EditOutlined className="icon" />
                    ) : null}
                    {button.name === "Delete" ? (
                      <DeleteOutlined className="icon" />
                    ) : null}
                    {button.name}
                  </div>
                );
              })}
            </div>
          </div>
        );
      default:
        return null;
    }
  })();
};
