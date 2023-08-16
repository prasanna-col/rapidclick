import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Modal,
    StyleSheet,
    ScrollView,
    Platform
} from 'react-native';

const BtmHalf_InVoiceModal = ({ isVisible, closeModal, onSendInvoice, scoredata, onSaveScore, onresetGame, userList }) => {
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [PlayerName, setPlayerName] = useState(0);

    var isNewScore = false
    if (userList.length == 3) {
        const lowestTopScore = userList[userList.length - 1].score;
        if (scoredata <= lowestTopScore) {
            isNewScore = false
        } else {
            isNewScore = true
            console.log("New score ");
        }
    } else {
        isNewScore = true
    }

    const renderSaveBtn = () => {
        return (
            <View style={styles.BtmBtnView}>
                <TouchableOpacity
                    activeOpacity={PlayerName ? 0.8 : 1}
                    style={[styles.submitButton, { backgroundColor: PlayerName ? '#1faadb' : "#a3a3a3", }]} onPress={() => {
                        if (PlayerName) {
                            onSaveScore(PlayerName);
                            setPlayerName("")
                        }
                    }}>
                    <Text style={styles.submitButtonText}>Submit this attempt</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderRestartBtn = () => {
        return (
            <View style={styles.BtmBtnView}>
                <TouchableOpacity style={styles.restartButton} onPress={() => {
                    onresetGame();
                    setPlayerName("")
                }}>
                    <Text style={styles.submitButtonText}>Start the game again</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={closeModal}>
            <View style={styles.modalContainerOuter}>
                <View style={styles.modalContainer}>
                    <View style={styles.TitleView}>
                        <Text style={styles.Titletxt}>Attention!, Be sure to</Text>
                    </View>
                    <ScrollView
                        contentContainerStyle={[
                            styles.scrollViewContent,
                            {
                                paddingBottom: Platform.OS == 'ios' ? keyboardHeight : 0,
                            },
                        ]}>
                        <Text style={{ color: "#000", fontSize: 20, textAlign: "center", fontWeight: "bold", marginBottom: 10 }}>{`Your Score is ${scoredata}`}</Text>
                        {
                            isNewScore ?
                                <>
                                    <Text style={{ color: "#000", fontSize: 15, textAlign: "center", fontWeight: "bold", marginBottom: 20 }}>{`♚ Amazing, you're in the top three! ☺`}</Text>
                                    <TextInput
                                        style={styles.titleInputStyle}
                                        placeholder="Player Name here"
                                        placeholderTextColor="#a3a3a3"
                                        value={PlayerName}
                                        onChangeText={text => setPlayerName(text)}
                                    />
                                    {renderSaveBtn()}
                                    <Text style={{ color: "#a3a3a3", fontSize: 10, textAlign: "center", fontWeight: "bold", margin: 20 }}>{`------ (or) ------`}</Text>
                                </>
                                :
                                <>
                                    <Text style={{ color: "#000", fontSize: 15, textAlign: "center", fontWeight: "bold", marginBottom: 20 }}>{`Oops!, You're not in top three!`}</Text>
                                    <Text style={{ color: "#000", fontSize: 100, textAlign: "center", fontWeight: "bold", marginBottom: 20 }}>{`☹`}</Text>
                                </>
                        }
                        {renderRestartBtn()}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainerOuter: {
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        height: '70%',
        width: '100%',
        bottom: 0,
        position: 'absolute',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#f5f7ff',
    },
    scrollViewContent: {
        width: '100%',
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        color: '#000',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    BtmBtnView: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
        // marginBottom:20
    },
    submitButton: {
        padding: 16,
        alignItems: 'center',
        borderRadius: 5,
    },
    restartButton: {
        backgroundColor: '#ffa347',
        padding: 16,
        alignItems: 'center',
        borderRadius: 5,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    closeBtnView: {
        width: '100%',
        paddingLeft: 10,
        paddingBottom: 10,
        flexDirection: 'row-reverse',
    },
    closeBtn: {
        height: 30,
        width: 30,
        borderRadius: 30 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    closetxt: { color: '#000', fontSize: 17, fontWeight: '900' },
    TitleView: {
        width: '100%',
        paddingHorizontal: 20,
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#000',
    },
    orderIDView: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,

        flexDirection: 'row',
        alignItems: 'center',
    },
    Titletxt: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '800',
        textAlign: 'center',
    },
    ordertxt: {
        color: '#000',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'left',
    },
    descStyle: {
        height: 100,
        width: '95%',
        fontSize: 16,
        backgroundColor: '#fff',
        marginVertical: 30,
        borderRadius: 10,
        textAlignVertical: 'top',
        padding: 10,
        marginHorizontal: 5,
        lineHeight: 21,
        paddingStart: 15,
    },
    inputsView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    titleInputStyle: {
        backgroundColor: '#fff',
        borderRadius: 12,
        width: '100%',
        // height: 35,
        shadowOpacity: 0.3,
        shadowColor: '#99ABC6',
        margin: 3,
        color: '#000',
        paddingLeft: 10,
        marginBottom: 20
    },
    priceInputStyle: {
        backgroundColor: '#fff',
        borderRadius: 12,
        width: '25%',
        height: 35,
        borderWidth: 0.3,
        shadowOpacity: 0.3,
        shadowColor: '#99ABC6',
        margin: 3,
        color: '#000',
        paddingLeft: 10,
    },
});

export default BtmHalf_InVoiceModal;
