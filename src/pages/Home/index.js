import DatePicker from "react-datepicker";

import { Link } from "react-router-dom";

import { FaCheck } from 'react-icons/fa';

import { useState, useEffect } from "react";

import axios from "axios";

import moment from "moment";

import './styles.css'

const Home = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [tasksBd, setTasksBd] = useState([]);

    useEffect(()=>{
        getTasks()
    })


    const saveTask = async () => {
        const task = await axios.post('https://backendnodejsunidade4.herokuapp.com/todo', {
            title: title,
            description: description,
            date: date
        });

        getTasks();

        alert('Salvo com sucesso!');
    }

    const getTasks = async () => {
        const tasks = await axios.get('https://backendnodejsunidade4.herokuapp.com/todo');

        setTasksBd(tasks.data);

        console.log('TASKS: ', tasks);
    }

    const updateTask = async (id, status) => {
        await axios.put('https://backendnodejsunidade4.herokuapp.com/todo/' + id, {
            status: !status
        });

        //alert('Atualizado!');
    }


    return (
        <div className='containerHome'>
            <div className='subcontainerHome'>
                <div className='containerEsquerda'>
                    <h1>Task List</h1>
                    <p>Junte-se a mais de meio milhão de usuários e gerencie sua rotina da melhor forma!</p>

                    <div className='containerForm'>
                        <input placeholder='Titulo' onChange={(txt) => setTitle(txt.target.value)}></input>
                        <textarea placeholder='Descrição' onChange={(txt) => setDescription(txt.target.value)}></textarea>
                        <DatePicker dateFormat='dd/MM/yyyy' selected={date} onChange={(txt) => setDate(txt)} />
                        <button className="buttonSalvar" onClick={saveTask}>Salvar</button>
                    </div>

                </div>

                <ul className='containerDireita'>
                    
                    {tasksBd.map(item=>{

                        const formattedDate = moment(item.date).format('DD/MM/yyyy')

                        const checkBox = item.status ? <FaCheck size={22} color="#1a1a1a"/> : <FaCheck  size={22} color="#1a1a1a"/>

                        return (
                                <li key={item._id}>
                                    <div>
                                        <Link to={"/details/" + item._id}>
                                            <h2 style={item.status ? {} : {textDecoration: 'line-through'}}>{item.title}</h2>
                                            <h3 style={item.status ? {} : {textDecoration: 'line-through'}}>{formattedDate}</h3>
                                            <h3 style={item.status ? {} : {textDecoration: 'line-through'}}>{item.description}</h3>
                                        </Link>
                                    </div>
                                    <button onClick={() => updateTask(item._id, item.status)}>
                                        <FaCheck size={22} color="#1a1a1a"/>
                                    </button>
                                </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Home;