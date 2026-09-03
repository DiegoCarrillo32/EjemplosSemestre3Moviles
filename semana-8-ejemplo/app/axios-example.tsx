import { axiosClient } from "@/lib/api/axios-client";
import { Post, State } from "@/lib/api/types";
import { styles } from "@/styles/FetchGlobalStyles";
import axios, { CancelTokenSource } from "axios";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Text,
  TextInput,
  View,
} from "react-native";

const AxiosExample = () => {
  const [posts, setPosts] = useState<State<Post[]>>({
    data: null,
    loading: false,
    error: null,
  });

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const cancelRef = useRef<CancelTokenSource | null>(null);

  useEffect(() => {
    cancelRef.current = axios.CancelToken.source();

    async function loadPosts() {
      setPosts({ data: null, loading: true, error: null });
      try {
        const { data } = await axiosClient.get<Post[]>("/posts", {
          params: {
            _limit: 5,
          },
          cancelToken: cancelRef.current?.token,
        });
        setPosts({ data, loading: false, error: null });
      } catch (error) {
        setPosts({
          data: null,
          loading: false,
          error: (error as Error).message,
        });
      }
    }

    loadPosts();
    return () => cancelRef.current?.cancel();
  }, []);

  const handleCreate = async () => {
    const { data } = await axiosClient.post<Post>("/posts", {
      title,
      body,
      userId: 1,
    });
    console.log(data);
  };

  return (
    <View>
      <Text>GET - Load Posts</Text>
      {posts.loading && <ActivityIndicator />}
      {posts.error && <Text>Error</Text>}
      {posts.data && (
        <FlatList
          data={posts.data}
          renderItem={({ item }) => (
            <View style={styles.postCard}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.postBody} numberOfLines={2}>
                {item.body}
              </Text>
            </View>
          )}
        />
      )}

      <Text>POST - Create a Post</Text>
      <TextInput
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Body"
        style={styles.input}
        value={body}
        onChangeText={setBody}
      />
      <Button title="Create post" onPress={handleCreate} />
    </View>
  );
};

export default AxiosExample;
