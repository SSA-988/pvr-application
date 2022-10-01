import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
import React ,{useEffect,useContext} from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";
import SvgQRCode from "react-native-qrcode-svg";
import MovieCards from "../components/MovieCards";
import { MoviesCards } from "../Context";
const TicketScreen = () => {
  const navigation = useNavigation();
  const { ticket } = useContext(MoviesCards);
  const route = useRoute();
  const ticketDetails = route.params;
  useEffect(() => {
    const loadTicket = () => {
      ticket.push(ticketDetails);
    }
    loadTicket();
  },[])
  console.log(route.params.selectedSeats.length);
  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: "white",
          height: "90%",
          margin: 10,
          borderRadius: 6,
        }}
      >
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "500" }}>
            {route.params.name}
          </Text>
          <Text>{route.params.selectedSeats.length}</Text>
          {/* {route.params.selectedSeats.map((item, index) => (
            <Text>{item}</Text>
          ))} */}
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 16, color: "gray" }}>HINDI - 2D</Text>

          <Text style={{ color: "red", fontSize: 16 }}>PVR TICKET</Text>
        </View>

        <Text
          style={{
            fontSize: 15,
            fontWeight: "600",
            marginHorizontal: 10,
            marginTop: 9,
          }}
        >
          {route.params.mall}
        </Text>

        <Text
          style={{
            borderRadius: 1,
            borderStyle: "dashed",
            borderColor: "#DCDCDC",
            height: 1,
            borderWidth: 0.5,
            margin: 10,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ marginTop: 10, marginLeft: 10 }}>
            <Text style={{ color: "gray", fontSize: 15, fontWeight: "500" }}>
              DATE & TIME
            </Text>
            <Text style={{ marginVertical: 4, fontSize: 16 }}>
              {route.params.timeSelected}
            </Text>
            <Text>{moment(route.params.date).utc().format("MM/DD/YYYY")}</Text>
          </View>

          <Image
            style={{ aspectRatio: 4 / 2, height: 60, borderRadius: 6 }}
            source={{ uri: route.params.image }}
          />
        </View>

        <Text
          style={{
            borderRadius: 1,
            borderStyle: "dashed",
            borderColor: "#DCDCDC",
            height: 1,
            borderWidth: 0.5,
            margin: 10,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ marginLeft: 14 }}>
            <Text>AUDI NO</Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                fontWeight: "bold",
                marginTop: 6,
              }}
            >
              2
            </Text>
          </View>

          <View>
            <Text>TICKETS</Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                fontWeight: "bold",
                marginTop: 6,
              }}
            >
              {route.params.selectedSeats.length}
            </Text>
          </View>

          <View style={{ marginRight: 15 }}>
            <Text>SEATS</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {route.params.selectedSeats.map((item, index) => (
                <Text
                  style={{
                    margin: 3,
                    fontSize: 15,
                    fontWeight: "bold",
                    marginTop: 6,
                  }}
                >
                  {item}
                </Text>
              ))}
            </View>
          </View>
        </View>

        <Text
          style={{
            borderRadius: 1,
            borderStyle: "dashed",
            borderColor: "#DCDCDC",
            height: 1,
            borderWidth: 0.5,
            margin: 10,
          }}
        />

        <View
          style={{
            height: 140,
            backgroundColor: "#8DA399",
            borderRadius: 6,
            margin: 10,
          }}
        >
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Price Details
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 4,
              }}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                0's Seat convenience
              </Text>
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                ₹{route.params.priceValue}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 4,
              }}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                Convenience Fee
              </Text>
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                ₹87
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 4,
              }}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                Grand Total
              </Text>
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                ₹{route.params.total}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 4,
              }}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                ID NO
              </Text>
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                FGSJSDN3493943
              </Text>
            </View>
          </View>
        </View>

        <Text
          style={{
            borderRadius: 1,
            borderStyle: "dashed",
            borderColor: "#DCDCDC",
            height: 1,
            borderWidth: 0.5,
            margin: 10,
          }}
        />

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 20,
          }}
        >
          <SvgQRCode value={"hello"} />
        </View>

        <Text style={{ fontSize: 16, fontWeight: "500", textAlign: "center" }}>
          W33JNK3
        </Text>
        <Text
          style={{
            borderRadius: 1,
            borderStyle: "dashed",
            borderColor: "#DCDCDC",
            height: 1,
            borderWidth: 0.5,
            margin: 10,
          }}
        />
      </View>
      <Pressable
      onPress={() => navigation.navigate("Home")}
        style={{
          backgroundColor: "green",
          marginLeft: "auto",
          marginRight: "auto",
          width: 120,
          borderRadius: 4,
          padding:10,
        }}
      >
        <Text style={{textAlign:"center",color:"white",fontSize:15}}>Home</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default TicketScreen;

const styles = StyleSheet.create({});
