import { useStoreData } from "../../hooks/useStoreData";

export default function TestPage() {
    const { fetchAllProducts, fetchAllUsers, fetchAllCarts, fetchSingleUser } = useStoreData();
    
    async function handleClick() {
        const products = await fetchAllProducts();
        console.log(products);
        const users = await fetchAllUsers();
        console.log(users);
        const carts = await fetchAllCarts();
        console.log(carts);
        const user = await fetchSingleUser(1);
        console.log(user);
    }

    return (
        <div>
            <h1>Test Page</h1>
            <p>This is a test page for development purposes.</p>
            <button onClick={handleClick}>Fetch Data</button>
        </div>
    );
}