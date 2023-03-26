import React,{FC} from "react";
import FormAdd from "../../UI/FormAdd/FormAdd";

const Home:FC = ()=>{
    return(
        <div className="Home">
            <div>
                Создать заявку на поездку
            </div>
            <div>
                Создать заявку на замену краски
            </div>
            <div>
                <FormAdd nameButton3="Создать заявку на замену оборудования" />
            </div>
        </div>
    )
}

export default Home