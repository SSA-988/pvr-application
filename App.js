import { StripeProvider } from "@stripe/stripe-react-native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { MovieContext } from "./Context";
import HomeScreen from "./screens/HomeScreen";
import StackNavigator from "./StackNavigator";

export default function App() {
  return (
    <>
      <MovieContext>
        <StripeProvider publishableKey="pk_test_51JEFpUSByXQZwLeJlP8yozoVPaknL6iXC2LgEAdRbtzAdrjrAjwdtWLblrx1iu5eP5mBeRVOCkHtPOkDYWSUTksZ00h0vpZ2Cg">
          <StackNavigator />
          <StatusBar style="auto" />
        </StripeProvider>
      </MovieContext>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
