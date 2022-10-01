import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
  Alert
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React, { useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MoviesCards } from "../Context";
import { useStripe } from "@stripe/stripe-react-native";
const TheatreScreen = () => {
  const route = useRoute();
  //   console.log(route.params);
  const navigation = useNavigation();
  const { seats, setSeats,occupied } = useContext(MoviesCards);
  const onSeatSelect = (item) => {
    const seatSelected = seats.find((seat) => seat === item);

    console.log(seatSelected, "you pressed on");
    if (seatSelected) {
      setSeats(seats.filter((seat) => seat !== item));
    } else {
      setSeats([...seats, item]);
    }
  };
  const displaySeats = [...seats]
  const fee = 87;
  const noOfSeats = seats.length;
  const priceValue = noOfSeats * 240;
  const total = seats.length > 0 ? fee + noOfSeats * 240 : 0;
  console.log(total);
  console.log(seats, "seats selected");
  const showSeats = () => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {seats.map((seat, index) => (
          <Text style={{ marginTop: 4, fontSize: 17, paddingHorizontal: 4 }}>
            {seat}
          </Text>
        ))}
      </View>
    );
  };
  const stripe = useStripe();
  const subscribe = async() => {
    const response = await fetch("http://localhost:8000/payment", {
      method: "POST",
      body: JSON.stringify({
        amount:Math.floor(total * 100),

      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) return Alert.alert(data.message);
    const clientSecret = data.clientSecret;
    const initSheet = await stripe.initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
    });
    if (initSheet.error) return Alert.alert(initSheet.error.message);
    const presentSheet = await stripe.presentPaymentSheet({
      clientSecret,
    });
    if (presentSheet.error) return Alert.alert(presentSheet.error.message);

    else{
      occupied.push(...seats);
      navigation.navigate("Ticket",{
        name:route.params.name,
        mall:route.params.mall,
        timeSelected:route.params.timeSelected,
        total:total,
        image:route.params.image,
        date:route.params.date,
        selectedSeats:displaySeats,
        priceValue:priceValue,
      })


      setSeats([]);
    }

  }
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 5 }}
            name="arrow-back"
            size={24}
            color="black"
          />
          <View style={{ marginLeft: 6 }}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              {route.params.name}
            </Text>
            <Text
              style={{
                marginTop: 2,
                color: "gray",
                fontSize: 15,
                fontWeight: "500",
              }}
            >
              {route.params.mall}
            </Text>
          </View>
        </View>

        <AntDesign
          style={{ marginRight: 12 }}
          name="sharealt"
          size={24}
          color="black"
        />
      </View>

      <Text
        style={{
          textAlign: "center",
          fontSize: 16,
          fontWeight: "bold",
          marginTop: 10,
        }}
      >
        {route.params.timeSelected}
      </Text>

      <Text
        style={{
          textAlign: "center",
          fontSize: 13,
          marginTop: 10,
          color: "gray",
        }}
      >
        CLASSIC (240)
      </Text>
      <View style={{ marginTop: 20 }} />
      <FlatList
        numColumns={7}
        data={route.params.tableSeats}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onSeatSelect(item)}
            style={{
              margin: 10,

              borderColor: "gray",
              borderWidth: 0.5,

              borderRadius: 5,
            }}
          >
            {
              seats.includes(item) ? (
                <Text style={{ backgroundColor: "#ffc40c", padding: 8 }}>{item}</Text>
              )
              :
              occupied.includes(item) ? (
                <Text style={{ backgroundColor: "#989898", padding: 8 }}>{item}</Text>
              )
              :
              (
                <Text style={{ padding: 8 }}>{item}</Text>
              )
            }
          </Pressable>
        )}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 100,
          marginTop: 20,
          backgroundColor: "#D8D8D8",
          padding: 10,
        }}
      >
        <View>
          <FontAwesome
            style={{ textAlign: "center", marginBottom: 4 }}
            name="square"
            size={24}
            color="#ffc40c"
          />
          <Text>selected</Text>
        </View>

        <View style={{ marginHorizontal: 20 }}>
          <FontAwesome
            style={{ textAlign: "center", marginBottom: 4 }}
            name="square"
            size={24}
            color="white"
          />
          <Text>Vacant</Text>
        </View>

        <View>
          <FontAwesome
            style={{ textAlign: "center", marginBottom: 4 }}
            name="square"
            size={24}
            color="#989898"
          />
          <Text>Occupied</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 14,
        }}
      >
        <View style={{ padding: 10 }}>
          <Text style={{ marginBottom: 4, fontSize: 15, fontWeight: "500" }}>
            show end tome approx 6:51Pm
          </Text>

          {seats.length > 0 ? (
            showSeats()
          ) : (
            <Text style={{ fontSize: 18 }}>No seats selected</Text>
          )}
        </View>

        <View
          style={{
            backgroundColor: "#E0E0E0",
            padding: 10,
            borderTopLeftRadius: 6,
            borderBottomLeftRadius: 6,
            marginTop: 10,
          }}
        >
          <Text style={{ width: 100 }}>Now with ticket cancellation</Text>
        </View>
      </View>
      <Pressable
        style={{
          backgroundColor: "#ffc40c",
          padding: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: 20,
        }}
      >
        {seats.length > 0 ? (
          <Text style={{ fontSize: 17, fontWeight: "500" }}>
            {seats.length} seat's selected
          </Text>
        ) : (
          <Text></Text>
        )}

        <Pressable onPress={subscribe}>
          <Text style={{ fontSize: 17, fontWeight: "600" }}>PAY {total}</Text>
        </Pressable>
      </Pressable>
    </SafeAreaView>
  );
};

export default TheatreScreen;

const styles = StyleSheet.create({});
