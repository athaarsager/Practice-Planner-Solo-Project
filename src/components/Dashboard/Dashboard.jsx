import { useSelector } from "react-redux";
import DashboardFooter from "../DashboardFooter/DashboardFooter";

function Dashboard() {
    const username = useSelector(store => store.user.username);
    console.log(username);

    return (
        <>
        <h1>Welcome to the Dashboard, {username}!</h1>
        <DashboardFooter />
        </>
    );
}
export default Dashboard;