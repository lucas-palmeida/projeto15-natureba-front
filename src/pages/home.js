import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import Product from "../components/Product.js"
import styled from "styled-components"
import Header from "../components/Header"

export default function Home({ apiForm }) {

    const [count, setCount] = useState(0)
    const [carrinho, setCarrinho] = useState([])
    const [form, setForm] = useState({ search: "" })
    const [listProducts, setListProducts] = useState([])
    const [filtervegetables, setFiltervegetables] = useState([])
    const [filterfruits, setFilterfruits] = useState([])
    const [filterleaf, setFilterleaf] = useState([])

     const navigate = useNavigate()

    const token = apiForm.token

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }


    useEffect(() => {

        axios.get("http://localhost:5001/products")
            .then((res) => {

                let vegetables = res.data.filter(item => item.category === "legumes")
                let fruits = res.data.filter(item => item.category === "frutas")
                let leaf = res.data.filter(item => item.category === "folhas")
                let inputFilter = res.data.filter(item => item.name.includes(form.search))

                setFiltervegetables(vegetables)
                setFilterfruits(fruits)
                setFilterleaf(leaf)
                setListProducts(inputFilter)
            })
    }, [form])

    function handleSelect(name, price, cont) {

        const isSlected = carrinho.find((s) => s.name === name)

        if (isSlected && cont > 0) {
            const newList = carrinho.filter((s) => s.name !== name)
            setCarrinho([...newList, { name, price, cont }])
        } else if (cont <= 0) {
            const newList = carrinho.filter((s) => s.name !== name)
            setCarrinho([...newList])
        }
        else {
            setCarrinho([...carrinho, { name, price, cont }])
        }
    }

     function exit() {
             navigate("/")
         }
    
    return (

        <HomeConteinerA>

            <Header apiForm={apiForm} setForm={setForm} form={form} carrinho={carrinho} exit={exit} setListProducts={setListProducts} />

            {listProducts.length > 17 ?
                <div>

                    <ContainerCategory>

                        <div>
                            <span><h2>vegetables</h2></span>
                        </div>

                        <div>
                            {filtervegetables.map(p => (<Product key={p._id}
                                name={p.name} price={p.price} category={p.category}
                                unit={p.unit} picture={p.picture}
                                count={count} setCount={setCount}
                                handleSelect={handleSelect} />))}
                        </div>

                    </ContainerCategory>

                    <ContainerCategory>
                    <div>
                        <h2>fruits </h2>
                        </div>

                        <div>
                        {filterfruits.map(p => (<Product key={p._id}
                            name={p.name} price={p.price} category={p.category}
                            unit={p.unit} picture={p.picture}
                            count={count} setCount={setCount}
                            handleSelect={handleSelect} />))}
</div>
                    </ContainerCategory>

                    <ContainerCategory>
                        <div>

                        <h2>leaf </h2>
                        </div>

                        <div>
                        {filterleaf.map(p => (<Product key={p._id}
                            name={p.name} price={p.price} category={p.category}
                            unit={p.unit} picture={p.picture}
                            count={count} setCount={setCount}
                            handleSelect={handleSelect} />))}
</div>
                    </ContainerCategory>


                </div> :
<>
                <TitleSearch> Resultado para "{form.search}"</TitleSearch>
                {listProducts.length === 1 ?<ReturnSeach> {listProducts.length} resuldado encontrado</ReturnSeach>:
                <ReturnSeach> {listProducts.length} resuldados encontrados</ReturnSeach>
                }
                <ContainerCategory>
                                        
                <ContainerFilter>
                    {listProducts.map(p => (<Product key={p._id}
                        name={p.name} price={p.price} category={p.category}
                        unit={p.unit} picture={p.picture}
                        count={count} setCount={setCount}
                        handleSelect={handleSelect} />))}

                    </ContainerFilter>

                </ContainerCategory>
                </>
            }

        </HomeConteinerA>
    )
}


const HomeConteinerA = styled.main`
flex:display;
flex-direction:column;
background-color:#f7f7f7;
`

const ContainerCategory = styled.section`
    display:flex;
    flex-direction:column;
    overflow-x:scroll;
    background-color:white;
    margin-top:10px;
    div:nth-child(1){
        display:flex;
        align-items:center;
        width:375px;
        height:75px;
        h2{
            font-family:'open-sans';
            font-size:18px;
            font-weight:700;
            margin-left:20px;            
        }
    }
    div:nth-child(2){
    display:flex;
    }
`

const ContainerFilter = styled.section`
margin-top:10px;
display:flex;
`

const TitleSearch = styled.h2`
width:205px;
height:56px;
display:flex;
font-size:28px;
font-weight:700;
padding-left:15px;
word-wrap:break-word;
margin: 20px 0 20px 0;
`

const ReturnSeach = styled.p`
margin-bottom:30px;
padding-left:15px;
`