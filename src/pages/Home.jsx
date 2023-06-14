import Search from "../components/Search";
import Products from "../components/products/Products";

function Home() {
    const currentUser = { email: 'test@example.com' }; // Здесь нужно заменить на реального пользователя или получать данные из контекста/состояния

    return (
        <>
            <Search/>
            <Products selectedProductType="All Lots" currentUser={currentUser} />
        </>
    );
}

export default Home;