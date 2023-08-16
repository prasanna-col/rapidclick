
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
} from 'react-native';

const ScoreModal = ({ isVisible, closeModal, data }) => {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => {
                closeModal();
            }}>
            <View style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.8)',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <View
                    style={{
                        width: '90%',
                        borderRadius: 20,
                        backgroundColor: "#f5f7ff",
                        padding: 30,
                        alignItems: 'center',
                    }}>

                    <View
                        style={{ width: '100%' }}>
                        {
                            data?.length > 0 ?
                                <>
                                    <Text style={{ color: "#000", marginBottom: 20, fontWeight: "bold", fontSize: 30, }}>Prime 3 Players</Text>
                                    <View style={{ width: "80%" }}>
                                        {
                                            data.map((val, key) => {
                                                return (
                                                    <Text style={{ color: "#000", marginBottom: 10, fontWeight: "400", fontSize: 20, textAlign: "left", textTransform: "capitalize" }}>{`${val.name} - ${val.score}`}</Text>
                                                )
                                            })
                                        }
                                    </View>

                                </>
                                :
                                <Text style={{ color: "#000", fontWeight: "bold", fontSize: 30, }}>There is no trace of the player.</Text>
                        }

                        <View style={{ width: "100%", alignItems: "flex-end" }}>
                            <TouchableOpacity
                                onPress={() => {
                                    closeModal(); // Close modal
                                }}
                                style={{
                                    marginTop: 30,
                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                    backgroundColor: '#000',
                                    borderRadius: 10,
                                }}>
                                <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>
                                    Close
                                </Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ScoreModal;