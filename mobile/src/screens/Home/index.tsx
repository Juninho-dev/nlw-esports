import { useEffect, useState } from "react";
import { FlatList, View, Image } from "react-native";
import { styles } from "./styles";

import logoImg from "../../assets/logo-nlw-esports.png";
import { Heading } from "../../components/Heading";
import { GameCard, GameCardProps } from "../../components/GameCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "../../components/Background";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);
  const navigation = useNavigation();

  function handleOpenGame({ id, bannerUrl, title }: GameCardProps) {
    navigation.navigate("game", { id, bannerUrl, title });
  }
  useEffect(() => {
    fetch("http://192.168.15.59:3333/games")
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />

        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard onPress={() => handleOpenGame(item)} data={item} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}
