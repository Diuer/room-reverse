import React, { Fragment, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

import { DEFAULT_ADULT, DEFAULT_CHILD } from "../constants";

import "./RoomAllocation.scss";

import PerRoom from "./PerRoom";

function RoomAllocation({ guest, room, onChange = () => {} }) {
	const [roomDetail, setRoomDetail] = useState(
		Array(room).fill({ adult: DEFAULT_ADULT, child: DEFAULT_CHILD })
	);

	const unSelectedAmount = useMemo(() => {
		const selectedAmount = roomDetail.reduce(
			(accumulate, item) => accumulate + item.adult + item.child,
			0
		);
		return guest - selectedAmount;
	}, [roomDetail]);

	useEffect(() => {
		const total = roomDetail.reduce(
			(accumulate, item) => accumulate + item.adult + item.child,
			0
		);

		if (total <= guest) {
			onChange(roomDetail);
		}
	}, [roomDetail]);

	return (
		<div className="room-allocation-container">
			<div className="room-overview">
				<p>
					住客人數：{guest}人 / {room}房
				</p>
				<p className="unselected-amount">尚未分配人數：{unSelectedAmount}人</p>
			</div>
			{roomDetail.map((item, index) => (
				<Fragment key={index}>
					{index !== 0 && <div className="separate-line"></div>}
					<PerRoom
						serialNo={index + 1}
						disabled={unSelectedAmount === 0}
						onChange={(result) => {
							setRoomDetail((roomDetail) => {
								const newRoomDetail = [...roomDetail];
								newRoomDetail[index] = result;
								console.newPersonInRoom;
								return newRoomDetail;
							});
						}}
					/>
				</Fragment>
			))}
		</div>
	);
}
export default RoomAllocation;

RoomAllocation.propTypes = {
	guest: PropTypes.number,
	room: PropTypes.number,
	onChange: PropTypes.func,
};
