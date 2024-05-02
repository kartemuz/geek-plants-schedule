function HomePage(){

    console.log(localStorage.getItem('userData').lastname);

    return(
        <div className="">Главная страница</div>
    )
}

export default HomePage;