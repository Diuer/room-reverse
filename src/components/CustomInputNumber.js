import React, { useCallback } from "react";
import cn from "clsx";
import PropTypes from "prop-types";

import "./CustomInputNumber.scss";

function CustomInputNumber({
  name,
  min,
  max,
  step,
  value,
  disabled,
  onChange = () => {},
  onBlur = () => {},
}) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const handleBlur = (e) => {
    if (e.target.value > max) {
      onChange(max);
    } else if (e.target.value < min) {
      onChange(min);
    }
    onBlur(e);
  };

  const handleMinus = useCallback(() => {
    if (!isNaN(min) && value - step >= min) {
      onChange(value - step);
    }
  }, [value, min, max, step]);

  const handleAdd = useCallback(() => {
    if (!isNaN(max) && value + step <= max && !disabled) {
      console.log(disabled);
      onChange(value + step);
    }
  }, [value, min, max, step, disabled]);

  return (
    <div className="input-custom-container">
      <button
        className="btn btn-minus"
        disabled={value <= min}
        onClick={handleMinus}
      >
        －
      </button>
      <input
        id="number"
        className={cn("input-number")}
        name={name}
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        onBeforeInput={(e) => console.log("onBeforeInput", e.target.value)}
        onBlur={handleBlur}
      />
      <button
        className="btn btn-add"
        disabled={disabled || value >= max}
        onClick={handleAdd}
      >
        ＋
      </button>
    </div>
  );
}
export default CustomInputNumber;

CustomInputNumber.propTypes = {
  name: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
};
