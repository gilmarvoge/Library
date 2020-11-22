import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Header } from 'components';
//import { Map, TileLayer, Marker } from 'react-leaflet';
//import { LeafletMouseEvent } from 'leaflet';
//import axios from 'axios';
//import api from '../../services/api';

import './styles.css';


interface Item {
    id: number,
    title: string,
    image_url: string,
}


function Home() {

    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
    })
    const [selectedUf, setsSelectedUf] = useState('0');
    const [cities, setCities] = useState<string[]>([]);
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);

    const history = useHistory();


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;

            setInitialPosition([latitude, longitude]);
        })
    }, []);

    useEffect(() => {
        // api.get('items').then(response => {
        //     setItems(response.data);
        // })
    }, []);

 

    function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;
        setsSelectedUf(uf);
    }

    function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
        const municipio = event.target.value;
        setSelectedCity(municipio);
        console.log(municipio)
    }

    // function handleMapClick(event: LeafletMouseEvent) {
    //     setSelectedPosition([
    //         event.latlng.lat,
    //         event.latlng.lng
    //     ])
    // }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value })
    }

    function handleSelectItem(id: number) {
        const alreadySelected = selectedItems.findIndex(item => item === id);

        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id);
            setSelectedItems(filteredItems);
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { name, email, whatsapp } = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition;
        const items = selectedItems;

        const data = {
            name,
            email,
            whatsapp,
            uf,
            city,
            latitude,
            longitude,
            items
        }
        //await api.post('points', data);
        alert('Ponto de coleta criado!');
        history.push('/');

    }

    return (
        <div id='page-home'>
            <Header/>
        
           

        </div>
    )
}

export default Home;