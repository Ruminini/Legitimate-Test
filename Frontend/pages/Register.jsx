import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import BackButton from '../components/BackButton';
import MenuButton from '../components/MenuButton';
import { validateIdMember, insertMember } from '../services/MemberRegister';
import insertFaceDescriptorsMember from '../services/FaceDescriptorsRegister';
import Toast from 'react-native-toast-message';

export default function Register({ goTo, data }) {
    const [password, onChangePassword] = useState(data.password || '');
    const [id, onChangeId] = useState(data.id || '');
    const [invalid, setInvalid] = useState('');
    const errorMessage = useState('');
    const descriptors = useState(data.descriptors || null);

    const validateAndRegister = async () => {
        // Validación del formato del legajo
        if (!id.match(/^[0-9]{8}-[0-9]{4}$/)) {
            Toast.show({ type: 'info', 
            text1: 'Formato de legajo incorrecto.',
            text2: 'Debe ser 8 dígitos - (guión) 4 dígitos.'});
            setInvalid('id');
            return false;
        }

        // Validación del formato de la contraseña
        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
            Toast.show({ type: 'info', 
            text1: 'Formato de contraseña incorrecto.',
            text2: 'Debe tener al menos 8 caracteres (minusculas, mayusculas y números).'});
            setInvalid('password');
            return false;
        }

        // Validación del legajo en la base de datos
        try {
            const idIsValid = await validateIdMember(id);
            if (!idIsValid) {
                Toast.show({ type: 'Error', text1: 'El legajo no es valido.' });
                resetForm();
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }

        // Validación de la foto tomada
        if (!descriptors) {
            Alert.alert('Error', 'Primero tome una foto por favor.');
            return false;
        }

        // Registrar miembro en la base de datos
        try {
            const memberInserted = await insertMember(id, password);
            if (!memberInserted) {
                Toast.show({ type: 'Error', text1: 'Ocurrió un error inesperado, comuníquese con su empleador.'});
                console.log('Error al intentar registrar el miembro.');
                return false;
            } else {
                console.log('Miembro registrado.');
            }
        } catch (error) {
            console.error(error);
            return false;
        }

        // Registrar descriptores del rostro en la base de datos
        try {
            const faceDescriptorsInserted = await insertFaceDescriptorsMember(id, descriptors);
            if (!faceDescriptorsInserted) {
                Toast.show({ type: 'Error', text1: 'Ocurrió un error inesperado, comuníquese con su empleador.'});
                console.log('Error al intentar registrar descritores.');
                return false;
            } else {
                console.log('Descriptores registrados.');
            }
        } catch (error) {
            console.error( error);
            return false;
        }
        Toast.show({ type: 'success', text1: 'Registro exitoso!' });
        goTo('MainMenu');
    };

    const resetForm = () => {
        onChangeId('');
        onChangePassword('');
        setInvalid('');
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={[styles.title, invalid === 'id' && { color: 'red' }]}>Legajo</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeId}
                    value={id}
                    placeholder="12345678-4321"
                    keyboardType="numeric"
                />
                <Text style={[styles.title, invalid === 'password' && { color: 'red' }]}>Contraseña</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangePassword}
                    value={password}
                    placeholder="••••••••••"
                    secureTextEntry={true}
                />
                {errorMessage !== '' && <Text style={styles.errorMessage}>{errorMessage}</Text>}
                <MenuButton
                    text="Tomar foto"
                    onPress={() => goTo(
                        'Login',
                        {onlyDescriptors: true},
                        () => goTo('Register', {id,password,descriptors}),
                        (desc) => goTo('Register', {id,password,desc})
                    )}
                    style={{ height: 75, width: 300, alignSelf: 'center'}} />
                <MenuButton text="Registrar" onPress={validateAndRegister} style={{ height: 75, width: 300, alignSelf: 'center'}} />
                
            </View>
            <BackButton onPress={() => goTo('MainMenu')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEE',
        width: '100%',
        justifyContent: 'center',
        padding: 25,
    },
    title: {
        fontSize: 25,
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        alignSelf: 'flex-start',
        padding: 5,
        paddingHorizontal: 15,
        elevation: 2,
        borderBottomWidth: 1,
        borderColor: '#CCC',
    },
    input: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 25,
        borderTopLeftRadius: 0,
        fontSize: 20,
        marginBottom: 20,
    },
    errorMessage: {
        color: 'red',
        textAlign: 'center',
        fontSize: 20,
    },
});
