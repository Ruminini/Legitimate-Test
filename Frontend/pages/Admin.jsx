import { StyleSheet, View } from 'react-native'
import React from 'react'
import MenuButton from '../components/MenuButton'
import MenuList from '../components/MenuList'
import BackButton from '../components/BackButton'
import Food from '../assets/svg/food.svg'
import Options from '../assets/svg/options.svg'
import Register from '../assets/svg/register.svg'
import Guest from '../assets/svg/guest.svg'


export default function Admin({ goTo }) {
    const goToManageMenus = () => {
        goTo(
            'FoodPicker',
            {adminMode: true},
            () => {goTo('Admin')},
            (food) => {goTo('ManageMenus', {food}, goToManageMenus)}
        );
    }
    return (
        <View style={styles.container}>
            <MenuList >
                <MenuButton
                    svg={<Options/>}
                    text='Gestionar miembros'
                    onPress={() => goTo('UserList')} />
                <MenuButton
                    svg={<Register/>}
                    text='Agregar invitados'
                    onPress={() => {goTo('UserList', {guests: true})}} />
                <MenuButton
                    svg={<Food/>}
                    text='Gestionar menús'
                    onPress={goToManageMenus} />
                <MenuButton
                    svg={<Guest/>}
                    text='Logs de sesiones'
                    onPress={() => goTo('Logs')} />
            </MenuList>
            <BackButton onPress={() => goTo('MainMenu')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEE',
        width: '100%',
    }
})