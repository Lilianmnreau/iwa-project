import { Text, View, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Calendar, LocaleConfig } from 'react-native-calendars';

// Configuration des locales pour le calendrier
LocaleConfig.locales['fr'] = {
    monthNames: [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 
        'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 
        'Novembre', 'Décembre'
    ],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 
        'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 
        'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    today: "Aujourd'hui"
};

LocaleConfig.defaultLocale = 'fr';

export default function EmplacementDetailsDisponibilities() {
    const [isCalendarVisible, setCalendarVisible] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().slice(0, 7)); // Format YYYY-MM
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [markedDates, setMarkedDates] = useState({});

    const toggleCalendar = () => {
        setCalendarVisible(!isCalendarVisible);
    };

    const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

    const onDayPress = (day) => {
        if (!startDate || (startDate && endDate)) {
            setStartDate(day.dateString);
            setEndDate(null);
            setMarkedDates({
                [day.dateString]: { selected: true, color: '#00adf5', textColor: 'white' }
            });
        } else if (startDate && !endDate) {
            if (new Date(day.dateString) < new Date(startDate)) {
                setEndDate(startDate);
                setStartDate(day.dateString);
                setMarkedDates({
                    [day.dateString]: { startingDay: true, color: '#00adf5', textColor: 'white' },
                    [startDate]: { endingDay: true, color: '#00adf5', textColor: 'white' }
                });
            } else {
                const range = getDateRange(startDate, day.dateString);
                const marked = {};
                range.forEach(date => {
                    marked[date] = { color: '#00adf5', textColor: 'white' };
                });
                marked[startDate] = { startingDay: true, color: '#00adf5', textColor: 'white' };
                marked[day.dateString] = { endingDay: true, color: '#00adf5', textColor: 'white' };
                setEndDate(day.dateString);
                setMarkedDates(marked);
            }
        }
    };

    const getDateRange = (start, end) => {
        const range = [];
        let currentDate = new Date(start);
        const endDate = new Date(end);
        while (currentDate <= endDate) {
            range.push(currentDate.toISOString().split('T')[0]);
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return range;
    };

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Disponibilité</Text>
                <Text style={styles.text}>
                    {startDate && endDate && startDate === endDate
                        ? `Le ${startDate}`
                        : startDate && endDate
                        ? `Du ${startDate} au ${endDate}`
                        : "Vous n'avez pas encore sélectionné de dates"}
                </Text>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={toggleCalendar}>
                    <Ionicons name="calendar" size={33} color="black" />
                </TouchableOpacity>
            </View>
            <Modal
                visible={isCalendarVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={toggleCalendar}
            >
                <TouchableWithoutFeedback onPress={toggleCalendar}>
                    <View style={styles.modalContainer}>
                        <TouchableWithoutFeedback>
                            <View style={styles.calendarContainer}>
                                <Calendar
                                    minDate={today}
                                    markingType={'period'}
                                    markedDates={markedDates}
                                    disableArrowLeft={currentMonth <= today.slice(0, 7)}
                                    onDayPress={onDayPress}
                                    onMonthChange={(month) => {
                                        setCurrentMonth(month.dateString.slice(0, 7));
                                    }}
                                    theme={{
                                        backgroundColor: '#ffffff',
                                        calendarBackground: '#ffffff',
                                        textSectionTitleColor: '#b6c1cd',
                                        textSectionTitleDisabledColor: '#d9e1e8',
                                        selectedDayBackgroundColor: '#00adf5',
                                        selectedDayTextColor: '#ffffff',
                                        todayTextColor: '#00adf5',
                                        dayTextColor: '#2d4150',
                                        textDisabledColor: '#d9e1e8',
                                        dotColor: '#00adf5',
                                        selectedDotColor: '#ffffff',
                                        arrowColor: 'black',
                                        disabledArrowColor: '#d9e1e8',
                                        monthTextColor: 'black', // Couleur du mois en noir
                                        indicatorColor: 'black',
                                        textDayFontFamily: 'monospace',
                                        textMonthFontFamily: 'monospace',
                                        textDayHeaderFontFamily: 'monospace',
                                        textDayFontWeight: '300',
                                        textMonthFontWeight: 'bold',
                                        textDayHeaderFontWeight: '300',
                                        textDayFontSize: 16,
                                        textMonthFontSize: 16,
                                        textDayHeaderFontSize: 16
                                    }}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    textContainer: {
        flex: 1,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    title: {
        fontSize: 24, // Augmente la taille du texte
        marginHorizontal: 10, // Ajoute une marge horizontale de 10
        fontWeight: 'bold', // Met le texte en gras
    },
    text: {
        fontSize: 16,
        marginHorizontal: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    calendarContainer: {
        width: '90%', // Augmente la taille du calendrier
        borderRadius: 10, // Arrondit les coins
        overflow: 'hidden', // Assure que le contenu respecte les bords arrondis
        backgroundColor: '#ffffff', // Fond blanc pour le calendrier
    },
});
