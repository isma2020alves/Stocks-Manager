import useGet from "../service/stockService";
import { PieChart, Pie, Tooltip, Legend } from 'recharts';
import { IPie } from "../interfaces/IPie"
import { colorsList } from "../assets/ColorsList"

function Home() {
    const { data, loading, error } = useGet('https://localhost:5001/api/Stocks/');

    if (loading) return <h1> LOADING... </h1>;

    if (error) return <h1> {error} </h1>;

    // PieChart parameters
    const listColors: string[] = colorsList;

    var pieData: IPie[] = [];
    Object.values(data).forEach(function (stock, color) {
        const colors = listColors[color];
        pieData.push({ name: stock.name, value: stock.price, fill: colors })
    });

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <strong className="titleTooltip">Stock's Details</strong>
                    <p className="label">{`Name: ${payload[0].name}`}</p>
                    <p className="label">{`Price: $${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="content">
            <h1>Stonks!</h1>
            <PieChart width={700} height={400}>
                <Pie data={Object.values(pieData)} dataKey="value" outerRadius={170} 
                label={renderCustomizedLabel} labelLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
            </PieChart>
        </div>
    );
};

export default Home;