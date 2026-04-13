export default function HelloWorld(){
        const propsUserCard = {
        nama: "Saya Lapar",
        nim: "L4P4R",
        tanggal: "2025-01-01"
    }

    return (
        <div>
            <h1>HALLLOOOOOOOO</h1>
            <p>Selamat Belajar ReactJs</p>
            <GreetingBinjai />

            <UserCard 
	            nama="Afii Imoett" 
	            nim="230505"
	            tanggal={new Date().toLocaleDateString()}
	          />

              <UserCard {...propsUserCard}/>

              <img src="img/sayalapar.jpg" alt="Logo" width={600} />
        </div>
    )
}

function GreetingBinjai(){
    return (
        <small> Salam dari Binjai🫡</small>
    )
}

function UserCard(props){
    return (
        <div>
            <hr/>
            <h3>Nama: {props.nama}</h3>
            <p>NIM: {props.nim}</p>
            <p>Tanggal: {props.tanggal}</p>
        </div>
    )
}