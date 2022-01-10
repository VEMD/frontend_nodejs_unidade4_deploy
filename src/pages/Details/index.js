import DatePicker from "react-datepicker";

import { Link, useParams } from "react-router-dom";

import { FaArrowLeft } from 'react-icons/fa';

import { useState, useEffect } from "react";

import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.css'

const Details = ({history}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    const params = useParams();

    useEffect(() => {
        getTask();
    }, [])

    const notify = (txt, tipo) => toast(txt, {type: tipo});

    const getTask = async () => {
        const task = await axios.get('https://backendnodejsunidade4.herokuapp.com/todo/' + params.id);
        setTitle(task.data.title);
        setDescription(task.data.description);

        const formattedDate = new Date(task.data.date);

        setDate(formattedDate);

        console.log(task)
    }

    const removeTask = async () => {
        await axios.delete('https://backendnodejsunidade4.herokuapp.com/todo/' + params.id);
        
        notify('Task deletada com sucesso!', 'success');
        history.push('/');
    }

    const updateTask = async () => {
        await axios.put('https://backendnodejsunidade4.herokuapp.com/todo/' + params.id, {
            title,
            description,
            date
        });
        
        notify('Task atualizada com sucesso!', 'success');
        
        

        //alert('Atualizado!');
    }

    
    return (
        <div className="containerDetails">
            <ToastContainer />
            <div className="subcontainerDetails">
                <div className="containerDetailsHeader">
                    <Link to="/">
                        <FaArrowLeft/>
                        <span>Voltar</span>
                    </Link>
                </div>

                <div>
                    <input value={title} placeholder='Titulo' onChange={(txt) => setTitle(txt.target.value)}></input>
                    <textarea value={description} placeholder='Descrição' onChange={(txt) => setDescription(txt.target.value)}></textarea>
                    <DatePicker value={date} dateFormat='dd/MM/yyyy' selected={date} onChange={(txt) => setDate(txt)} />
                </div>

                <div className="containerButtons">
                    <button className="buttonSalvar button" onClick={updateTask}>Salvar</button>
                    <button className="buttonExcluir button" onClick={removeTask}>Excluir</button>
                </div>
            </div>
        </div>
    )
}

export default Details;