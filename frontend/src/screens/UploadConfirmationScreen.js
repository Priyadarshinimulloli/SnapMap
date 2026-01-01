
import { Alert, Button, Image, StyleSheet,View } from "react-native";

const UploadConfirmationScreen = ({ navigation, route }) => {
  const { photo, location } = route.params || {};

  const handleUpload = () => {
    const timestamp = new Date().toISOString();
    const coords = location?.coords
      ? {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }
      : null;

    console.log("metadata", {
      timestamp,
      photo,
      location: coords,
    });

    Alert.alert("Photo was uploaded", "logged the data.");
    navigation.navigate("HomeScreen");
  };

  if (!photo?.uri) {
    return (
      Alert.alert("No photo found", " retake or try agin."),
      navigation.goBack(),
      <View />
    );
  }

  return (
    <View style={styles.root}>
      <Image source={{ uri: photo.uri }} style={styles.preview} />
      <View style={styles.actions}>
        <Button title="Upload Photo" onPress={handleUpload} />
        <Button title="Wanna Retake?" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

export default UploadConfirmationScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    gap: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: "#fff",
    textAlign: "center",
  },
  preview: {
    width: "100%",
    flex: 1,
    borderRadius: 12,
  },
  actions: {
    width: "100%",
    gap: 12,

    marginBottom: 10,
  },
});
