import { useSelector } from "react-redux";

function Dashboard() {
    const username = useSelector(store => store.user.username);
    console.log(username);

    return (
        <>
        <h1>Welcome to the Dashboard, {username}!</h1>
        </>
    );
}
export default Dashboard;