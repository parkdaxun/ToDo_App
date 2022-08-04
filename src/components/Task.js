import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import {images} from '../images';

const Container = styled.View`
  flex-direction : row;
  align-items : center;
  background-color : ${({theme}) => theme.itemBackground};
  border-radius : 10px;
  padding : 5px;
  margin : 3px 0px;
`;

const Contents = styled.Text`
  flex : 1;
  font-size : 15px;
  color : ${({theme}) => theme.text};
`;

const Task = ({item, deleteTask}) => {
    return (
        <Container>
            <IconButton type={images.uncompleted} />
            <Contents>{item.text}</Contents>
            <IconButton type={images.update} />
            <IconButton type={images.delete} id={item.id} onPressOut={deleteTask}/>
        </Container>
    );
};

Task.propTypes = {
    item: PropTypes.object.isRequired,
    deleteTask : PropTypes.func.isRequired,
};

export default Task;
