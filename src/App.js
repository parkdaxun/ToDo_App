import React, {useState} from 'react';
import styled, {ThemeProvider} from 'styled-components/native';
import {theme} from './theme';
import {Dimensions, StatusBar} from 'react-native';
import Input from './components/Input';
import IconButton from "./components/IconButton";
import {images} from "./images";
import Task from './components/Task';

const Container = styled.SafeAreaView`
    flex : 1;
    background-color : ${({theme}) => theme.background};
    align-items : center;
    justify-content : flex-start;
`;

const Title = styled.Text`
  font-size : 40px;
  font-weight: 600;
  color : white;
  align-self : flex-start;
  margin : 20px;
`;

const List = styled.ScrollView`
  flex : 1;
  width : ${({width}) => width - 40}px;
`;

export default function App() {
    const width = Dimensions.get('window').width;

    const [newTask, setNewTask] = useState('');
    const [tasks, setTasks] = useState({
        '1' : {id:'1', text:"유튜브 보기", completed:false},
        '2' : {id:'2', text:"유튜브 보기", completed:false},
        '3' : {id:'3', text:"유튜브 보기", completed:true},
        '4' : {id:'4', text:"유튜브 보기", completed:true},
    });

    const _addTask = () => {
        const ID = Date.now().toString();
        const newTaskObject = {
            [ID] : {id:ID, text:newTask, completed:false},
        };
        setNewTask('');
        setTasks({...tasks, ...newTaskObject});
    };

    const _deleteTask = id => {
        const currentTasks = Object.assign({}, tasks);
        delete currentTasks[id];
        setTasks(currentTasks);
    }

    const _handleTextChange = text => {
        setNewTask(text);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={theme.background}
                />
                <Title>ToDo List</Title>
                <Input
                    placeholder="✏️ 할일을 입력하시라세요"
                    value = {newTask}
                    onChangeText={_handleTextChange}
                    onSubmitEditing={_addTask}
                />
                <List width={width}>
                    {Object.values(tasks)
                        .reverse()
                        .map(item => (
                            <Task key={item.id} item={item} deleteTask={_deleteTask} />
                        ))}
                </List>
            </Container>
        </ThemeProvider>
    );
}
