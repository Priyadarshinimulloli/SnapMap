import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CAMERA_FACING = {
  front: "front",
  back: "back",
};

const FLASH_MODE = {
  on: "on",
  off: "off",
};

export default function CameraScreen({ navigation }) {
  const cameraRef = useRef(null);
  const [facing, setFacing] = useState(CAMERA_FACING.back);
  const [flash, setFlash] = useState(FLASH_MODE.off);
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraOk, setIsCameraOk] = useState(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>We need camera permission.</Text>
        <Button title="Grant permission" onPress={requestPermission} />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) =>
      current === CAMERA_FACING.back ? CAMERA_FACING.front : CAMERA_FACING.back
    );
  };

  const toggleFlash = () => {
    setFlash((current) =>
      current === FLASH_MODE.off ? FLASH_MODE.on : FLASH_MODE.off
    );
  };

  const handletheCapture = async () => {
    if (!cameraRef.current || !isCameraOk) {
      return;
    }

    const photo = await cameraRef.current.takePictureAsync();

    navigation.navigate("UploadConfirmationScreen", {
      photo,
    });
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        flash={flash}
        onCameraReady={() => setIsCameraOk(true)}
      />
      <View style={styles.controls}>
        <View style={styles.controlsRow}>
          <TouchableOpacity style={styles.controlButton} onPress={toggleFlash}>
            <Text style={styles.controlText}>
              Flash {flash === FLASH_MODE.on ? "On" : "Off"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={toggleCameraFacing}
          >
            <Text style={styles.controlText}>Flip</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.shutterOuter} onPress={handletheCapture}>
          <View style={styles.shutterInnerButton} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000ff",
  },
  permissionContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    backgroundColor: "#000000ff",
  },
  permissionText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  camera: {
    flex: 1,
  },
  controls: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
    gap: 16,
  },
  controlsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  controlButton: {
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  controlText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  shutterOuter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: "#0e0d0dff",
    alignItems: "center",
    justifyContent: "center",
  },
  shutterInnerButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#ffffffff",

    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',

    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
