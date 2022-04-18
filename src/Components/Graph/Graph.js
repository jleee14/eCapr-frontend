import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import "./Graph.css";

function Graph({ betData }) {
	const [graphData, setGraphData] = useState([]);
	const [dimensions, setDimensions] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});
	const d3Chart = useRef();
	const update = useRef(false);
	const margin = { top: 50, right: 30, bottom: 30, left: 60 };

	function calculateGraphData() {
		if (!betData) {
			console.log("stop running");
			return;
		}
		let valueArr = [];
		let objArr = [];
		for (let i = 0; i < betData.length; i++) {
			if (!valueArr.includes(betData[i].bet_type)) {
				valueArr.push(betData[i].bet_type);
				let valueObj = { betType: betData[i].bet_type, sum: 0 };
				objArr.push(valueObj);
			}
		}
		for (let i = 0; i < valueArr.length; i++) {
			let profit = betData
				.filter((bet) => bet.bet_type === valueArr[i])
				.reduce((accum, bet) => accum + parseFloat(bet.profit), 0);
			objArr[i] = { ...objArr[i], sum: profit };
		}
		setGraphData(objArr);
	}

	function drawChart(data, dimensions) {
		const chartwidth =
			parseInt(d3.select(".graph-container").style("width")) -
			margin.left -
			margin.right;
		const chartheight =
			parseInt(d3.select(".graph-container").style("height")) -
			margin.top -
			margin.bottom;

		const svg = d3
			.select(d3Chart.current)
			.attr("width", chartwidth + margin.left + margin.right)
			.attr("height", chartheight + margin.top + margin.bottom);

		const x = d3
			.scaleBand()
			.domain(d3.range(data.length))
			.range([margin.left, chartwidth - margin.right])
			.padding(0.1);

		svg
			.append("g")
			.attr("transform", "translate(0," + chartheight + ")")
			.call(
				d3
					.axisBottom(x)
					.tickFormat((i) => data[i].betType)
					.tickSizeOuter(0)
			);

		const max = d3.max(data, function (d) {
			return d.sum;
		});

		const min = d3.min(data, function (d) {
			return d.sum;
		});

		const y = d3
			.scaleLinear()
			.domain([min, max])
			.range([chartheight, margin.top]);

		svg
			.append("g")
			.attr("transform", "translate(" + margin.left + ",0)")
			.call(d3.axisLeft(y));

		svg
			.attr("fill", "#51f1b6")
			.selectAll("rect")
			.data(data)
			.join("rect")
			.attr("x", (d, i) => x(i))
			.attr("y", (d) => y(d.sum))
			.attr("height", (d) => y(0) - y(d.sum))
			.attr("width", x.bandwidth());
	}
	useEffect(() => {
		calculateGraphData();
	}, [betData]);

	useEffect(() => {
		document
			.querySelector(".graph-container")
			.addEventListener("resize", () => {
				setDimensions({
					width: document.querySelector(".graph-container").innerWidth,
					height: document.querySelector(".graph-container").innerHeight,
				});
			});
		if (update.current) {
			d3.selectAll("g").remove();
		} else {
			update.current = true;
		}
		drawChart(graphData, dimensions);
	}, [graphData, dimensions]);

	return (
		<div className="graph-container">
			<svg ref={d3Chart}></svg>
		</div>
	);
}

export default Graph;
