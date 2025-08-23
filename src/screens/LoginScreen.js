import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { login, signUp, signInWithGoogle } = useAuth();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithGoogle();
      if (!result.success) {
        Alert.alert("Erreur", result.error || "Erreur lors de la connexion avec Google");
      }
    } catch (error) {
      Alert.alert("Erreur", "Erreur lors de la connexion avec Google");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs requis");
      return;
    }

    if (isSignUp && !fullName) {
      Alert.alert("Erreur", "Veuillez entrer votre nom complet");
      return;
    }

    setIsLoading(true);

    try {
      let result;
      if (isSignUp) {
        result = await signUp(email, password, fullName);
        if (result.success) {
          Alert.alert("Succès", result.message || "Compte créé avec succès!", [
            { text: "OK", onPress: () => setIsSignUp(false) },
          ]);
        } else {
          Alert.alert("Erreur", result.error);
        }
      } else {
        result = await login(email, password);
        if (!result.success) {
          Alert.alert("Erreur", result.error);
        }
      }
    } catch (error) {
      Alert.alert("Erreur", "Erreur de connexion");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.loginContainer}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>Plateforme éducative</Text>

            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />

              {isSignUp && (
                <TextInput
                  style={styles.input}
                  placeholder="Nom complet"
                  placeholderTextColor="#999"
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              )}

              <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />

              <TouchableOpacity
                style={[styles.loginButton, isLoading && styles.disabledButton]}
                onPress={handleAuth}
                disabled={isLoading}
              >
                <Text style={styles.loginButtonText}>
                  {isLoading
                    ? isSignUp
                      ? "Création..."
                      : "Connexion..."
                    : isSignUp
                    ? "Créer un compte"
                    : "Se connecter"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.switchButton}
                onPress={() => setIsSignUp(!isSignUp)}
                disabled={isLoading}
              >
                <Text style={styles.switchButtonText}>
                  {isSignUp
                    ? "Vous avez déjà un compte ? Se connecter"
                    : "Pas de compte ? Créer un compte"}
                </Text>
              </TouchableOpacity>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>ou</Text>
                <View style={styles.dividerLine} />
              </View>

              <TouchableOpacity
                style={styles.googleButton}
                onPress={handleGoogleSignIn}
                disabled={isLoading}
              >
                <Text style={styles.googleButtonText}>
                  🔍 Continuer avec Google
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  loginContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
  },
  formContainer: {
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  loginButton: {
    backgroundColor: "#667eea",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  switchButton: {
    marginTop: 15,
    padding: 10,
  },
  switchButtonText: {
    textAlign: "center",
    color: "#667eea",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  dividerText: {
    marginHorizontal: 15,
    color: "#666",
    fontSize: 14,
  },
  googleButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  googleButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
  },
});
