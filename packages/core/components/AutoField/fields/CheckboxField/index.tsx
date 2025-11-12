import getClassNameFactory from "../../../../lib/get-class-name-factory";
import styles from "../../styles.module.css";
import { CheckSquare } from "lucide-react";
import { FieldPropsInternal } from "../..";

const getClassName = getClassNameFactory("Input", styles);

export const CheckboxField = ({
  field,
  onChange,
  readOnly,
  value,
  name,
  id,
  label,
  labelIcon,
  Label,
  hiddenLabelIcon,
}: FieldPropsInternal) => {
  if (field.type !== "checkbox" || !field.options) {
    return null;
  }

  // Ensure value is an array
  const checkedValues = Array.isArray(value) ? value : [];
  const layout = field.layout || "inline";

  const handleChange = (optionValue: any, checked: boolean) => {
    let newValues: any[];

    if (checked) {
      // Add value if not already present
      newValues = checkedValues.includes(optionValue)
        ? checkedValues
        : [...checkedValues, optionValue];
    } else {
      // Remove value
      newValues = checkedValues.filter((v) => v !== optionValue);
    }

    onChange(newValues);
  };

  return (
    <Label
      icon={labelIcon || <CheckSquare size={16} />}
      label={label || name}
      readOnly={readOnly}
      el="div"
      hiddenLabelIcon={hiddenLabelIcon}
    >
      <div
        className={
          getClassName("checkboxGroupItems") +
          (layout === "horizontal"
            ? ` ${getClassName("checkboxGroupItems--horizontal")}`
            : "") +
          (layout === "inline"
            ? ` ${getClassName("checkboxGroupItems--inline")}`
            : "")
        }
        id={id}
      >
        {field.options.map((option, index) => {
          const isChecked = checkedValues.includes(option.value);

          return (
            <label
              key={`${String(option.value ?? index)}`}
              className={getClassName("checkbox")}
            >
              <input
                type="checkbox"
                className={getClassName("checkboxInput")}
                value={JSON.stringify({ value: option.value })}
                name={name}
                onChange={(e) => {
                  handleChange(option.value, e.target.checked);
                }}
                disabled={readOnly}
                checked={isChecked}
              />
              <div className={getClassName("checkboxInner")}>
                {option.label || option.value?.toString()}
              </div>
            </label>
          );
        })}
      </div>
    </Label>
  );
};
