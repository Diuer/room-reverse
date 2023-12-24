import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { MAX_PER_ROOM } from "../constants";

import "./PerRoom.scss";

import CustomInputNumber from "./CustomInputNumber";

function PerRoom({ serialNo, disabled, onChange = () => {} }) {
	const [perRoom, setPerRoom] = useState({ adult: 1, child: 0 });

	const handleChange = (type, value) => {
		setPerRoom((perRoom) => ({
			...perRoom,
			[type]: Number(value),
		}));
	};

	useEffect(() => {
		if (perRoom.adult + perRoom.child <= MAX_PER_ROOM) {
			onChange(perRoom);
		}
	}, [perRoom]);

	return (
		<div className="per-room-container">
			<p>
				第{serialNo}間：{perRoom.adult + perRoom.child} 人
			</p>

			<div className="per-room-row">
				<p>
					大人
					<br />
					<span>年齡 20+</span>
				</p>
				<CustomInputNumber
					name={`room-${serialNo}-adult`}
					step={1}
					min={1}
					max={MAX_PER_ROOM}
					value={perRoom.adult}
					disabled={disabled || perRoom.adult + perRoom.child >= MAX_PER_ROOM}
					onChange={(value) => handleChange("adult", value)}
					onBlur={(e) => console.log(e)}
				/>
			</div>

			<div className="per-room-row">
				<p>小孩</p>
				<CustomInputNumber
					name={`room-${serialNo}-child`}
					step={1}
					min={0}
					max={MAX_PER_ROOM}
					value={perRoom.child}
					disabled={disabled || perRoom.adult + perRoom.child >= MAX_PER_ROOM}
					onChange={(value) => handleChange("child", value)}
					onBlur={(e) => console.log(e)}
				/>
			</div>
		</div>
	);
}
export default PerRoom;

PerRoom.propTypes = {
	serialNo: PropTypes.number,
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
};
