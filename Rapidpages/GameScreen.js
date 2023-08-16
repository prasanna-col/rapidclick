import React, { useEffect, useState } from "react";
import { Dimensions, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import getUsers, { initializeDatabase, insertData } from "./utils/sqlLiteCURD";
import BtmHalf_InVoiceModal from "./components/InputAlert";
import ScoreModal from "./components/ScoreModal";

const screenWidth = Dimensions.get("screen").height;
const screenHeight = Dimensions.get('screen').height;

const GameScreen = () => {

    const [loader, setLoader] = useState(true)

    const [isInputModalOpen, setIsInputModalOpen] = useState(false)

    const [isScoreModalOpen, setIsScoreModalOpen] = useState(false)
    const [userList, setUserList] = useState([])

    const [seconds, setSeconds] = useState(5);
    const [clickCount, setClickCount] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;

        if (isRunning && seconds > 0) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);
        } else if (seconds == 0) {
            setIsRunning(false)
            setIsInputModalOpen(true)
        }


        return () => clearInterval(interval);
    }, [isRunning, seconds]);

    const startTimer = () => {
        setIsRunning(true);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setSeconds(5);
        setClickCount(0)
    };

    const onViewScoreClick = () => {

    }


    const getuserslist = async () => {
        initializeDatabase() // create DB if it not exist
        
        console.log("setLoader")
        getUsers()
            .then((SavedUsers) => {
                if (SavedUsers) {
                    setUserList(SavedUsers)
                } else {
                    // initializeDatabase() // create DB
                }
                setLoader(false)
                console.log("SavedUsers", SavedUsers)
            })
            .catch(() => {

                setLoader(false)
            })
    }
    useEffect(() => {
        getuserslist()
    }, [])

    if (loader) {
        return (
            <View style={{ height: "100%", width: "100%", backgroundColor: "#f5f7ff", alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "#000", fontWeight: "bold", fontSize: 30, textAlign: "center" }}>  Functioning...</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ height: "100%", width: "100%", padding: 15, backgroundColor: "#f5f7ff" }}>
                <View style={{ height: 60, width: "100%", alignItems: "center", justifyContent: "center", borderBottomColor: "#dbdbdb", borderBottomWidth: 1 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "#000" }}>Rapid Click</Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: 15, justifyContent: "space-between" }}>
                    <View style={{ backgroundColor: "#fff", padding: 10, borderRadius: 10, }}>
                        <Text style={{ fontSize: 15, fontWeight: "bold", color: "#000", }}>{`${userList.length > 0 ? `Ultimate score is ${userList[0].score}` : `No trace in score!`}`}</Text>
                    </View>
                    <TouchableOpacity style={{ backgroundColor: "#fff", padding: 10, borderRadius: 10 }}
                        onPress={() => {
                            setIsScoreModalOpen(true)
                        }}
                    >
                        <Text style={{ fontSize: 15, fontWeight: "bold", color: "#000", }}>View Scores</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: "center", justifyContent: "center", height: screenHeight * 0.6 }}>
                    <Text style={{ color: "#000", marginVertical: 10, fontWeight: "bold", fontSize: 35, textAlign: "center" }}>Interval {seconds}</Text>
                    <View style={{ width: "50%", height: 1, backgroundColor: "#a3a3a3" }} />
                    <Text style={{ color: !isRunning ? "#c40010" : "#00850b", marginTop: 10, marginBottom: 40, fontWeight: "bold", fontSize: 35, textAlign: "center" }}>Count {clickCount}</Text>
                    {
                        !isRunning ?
                            <TouchableOpacity style={{ padding: 20, borderRadius: 20, backgroundColor: "#c40010" }}
                                onPress={() => {
                                    startTimer()
                                }}
                            >
                                <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff", }}>Start</Text>
                            </TouchableOpacity>
                            :
                            <>
                                <TouchableOpacity style={{ backgroundColor: "#fff", padding: 30, borderRadius: 30, backgroundColor: "#00850b" }}
                                    onPress={() => {
                                        setClickCount(pre => pre + 1)
                                    }}
                                >
                                    <Text style={{ fontSize: 30, fontWeight: "bold", color: "#fff", }}>Click</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: "#fff", padding: 10, borderRadius: 10, backgroundColor: "#ffa347", marginTop: 50 }}
                                    onPress={() => {
                                        resetTimer()
                                    }}
                                >
                                    <Text style={{ fontSize: 15, fontWeight: "bold", color: "#000", }}>Restart the game</Text>
                                </TouchableOpacity>
                            </>
                    }
                </View>
            </View>

            <BtmHalf_InVoiceModal
                isVisible={isInputModalOpen}

                onSaveScore={async (name) => {
                    console.log("current player name", name)
                    await insertData(name, clickCount)
                    await getuserslist()
                    await resetTimer()
                    await setIsInputModalOpen(false)
                }}
                onresetGame={() => {
                    resetTimer()
                    setIsInputModalOpen(false)
                }}
                scoredata={clickCount}
                userList={userList}

            />

            <ScoreModal
                isVisible={isScoreModalOpen}
                closeModal={() => {
                    setIsScoreModalOpen(false)
                }}
                onSendInvoice={() => {
                    // save process here
                }}
                data={userList}

            />
            <View style={{ alignItems: "center", justifyContent: "center", position: "absolute", bottom: 5, width: "100%" }}>
                <Text style={{ textAlign: "center", fontSize: 10, color: "#dbdbdb" }}>Developed by Prasanna</Text>
            </View>

        </SafeAreaView>
    )
}


export default GameScreen;