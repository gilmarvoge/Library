import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { FiArrowLeft } from 'react-icons/fi';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import AddIcon from '@material-ui/icons/Add';

import Header from 'components/Header';
import { IBooks, IBook } from 'models'
//import { Map, TileLayer, Marker } from 'react-leaflet';
//import { LeafletMouseEvent } from 'leaflet';
//import axios from 'axios';
//import api from '../../services/api';

import './styles.css';

interface Props {
    books: IBooks[];
}

interface Item {
    id: number,
    title: string,
    image_url: string,
}


function Home(props: any) {
    const { books, dispatch } = props;
    const { push } = useHistory();
    console.log("books ", books)

    return (
        <div id='page-home'>
            <Header />

            <div className="content">

                {books.map((book: IBook) => (
                    <Card key={book.id}

                        classes={{
                            root: 'card-root', // class name, e.g. `classes-nesting-root-x`

                        }}

                    >
                        <CardHeader

                            action={
                                <>
                                    <Tooltip title="Editar livro" placement="bottom">
                                        <IconButton aria-label="edit" onClick={()=>push(`/edit/:${book.id}`)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Excluir livro" placement="bottom">
                                        <IconButton aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </>
                            }
                            title={book.title}
                            subheader={book.author}
                        />
                        <CardMedia
                            className="media"
                            src={book.image_url}
                        // title="Paella dish"
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {book.image_url}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Tooltip title="Alugar livro" placement="bottom">
                                <IconButton aria-label="rent book">
                                    <BookmarkIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Mais Informações" placement="bottom">
                                <IconButton aria-label="share">
                                    <VisibilityIcon />
                                </IconButton>
                            </Tooltip>

                        </CardActions>
                        {/* <img src={book.image_url} alt="teste" />
                        <span>{ }</span> */}

                    </Card>
                ))}
            </div>
            <Tooltip title="Adicionar livro" placement="bottom">
                <Fab color="primary"
                    aria-label="add"
                    classes={{
                        root: 'fab', // class name, e.g. `classes-nesting-root-x`

                    }}
                    onClick={()=>push('/create')}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>

        </div>
    )
}

const mapStateToProps = ({ books }: { books: IBooks, }) => ({
    books: books,

});
export default connect(mapStateToProps)(Home);
