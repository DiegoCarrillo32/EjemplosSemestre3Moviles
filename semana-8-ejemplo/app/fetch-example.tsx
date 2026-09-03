import { fetchClient } from "@/lib/api/fetch-client";
import { Post, State } from "@/lib/api/types";
import { styles } from "@/styles/FetchGlobalStyles";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

const FetchExample = () => {
  const [posts, setPosts] = useState<State<Post[]>>({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function loadPosts() {
      setPosts({ data: null, loading: true, error: null });
      try {
        const posts = await fetchClient.get<Post[]>("/posts?_limit=5");
        setPosts({ data: posts, loading: false, error: null });
      } catch (error) {
        setPosts({
          data: null,
          loading: false,
          error: (error as Error).message,
        });
      }
    }

    loadPosts();
    return () => controller.abort();
  }, []);

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
    </View>
  );
};

export default FetchExample;
