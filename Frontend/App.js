import { StyleSheet, Text, View, Button, TouchableOpacity, Image, Dimensions, StatusBar } from 'react-native';
import { useState, useEffect } from 'react';
import FaceScan from './pages/FaceScan';
import OfflineLogin from './pages/OfflineLogin';
import Login from './pages/Login';
import MainMenu from './pages/MainMenu';
import ConfigMenu from './pages/ConfigMenu'
import FoodPicker from './pages/FoodPicker';
import Register from './pages/Register';
import OrderRetire from './pages/OrderPickUp';

export default function App() {
  const [page, setPage] = useState(<View/>);
  useEffect(() => setPage(<MainMenu onPress={handleMainMenuButton}/>), []);

  const setMainMenu = () => {
    setPage(<MainMenu onPress={handleMainMenuButton}/>);
  };

  // Si no hay conexión muestra la página con el login offline
  const setOfflineLogin = () => {
    setPage(<OfflineLogin onPress={handleDefault}/>);
  };

  const handleMainMenuButton = (option) => {
    switch (option) {
      case 'FoodPicker':
        setPage(<FoodPicker onPress={handleDefault}/>);
        break;
      case 'FaceScan':
        setPage(<Login onPress={handleDefault}/>);
        break;
      case 'Register':
        setPage(<Register onPress={handleDefault}/>);
        break;
      case 'ConfigMenu':
        setPage(<ConfigMenu onPress={handleDefault}/>);
        break;
    }
  };

  const handleDefault = ({ faceId, page }) => { // Modifica handleDefault para recibir faceId y page
    switch (page) {
      case 'noConnection':
        setOfflineLogin();
        break;
      case 'orderRetire':
        setPage(<OrderRetire faceId={faceId} onPress={handleDefault} />); // Renderiza la página Result con faceId como prop
        break;
      default:
        setMainMenu();
        break;
    }
  };

  return (
      <View style={styles.container}>
        {page}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#EEE',
      width: '100%',
      position: 'relative',
      paddingTop: StatusBar.currentHeight
  }
});
