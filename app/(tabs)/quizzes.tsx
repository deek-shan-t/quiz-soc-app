import { View, Text } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { useEffect, useState } from 'react';
import { fetchPastQuizzes, fetchUpcomingQuizzes } from '@/lib/api';

export default function UpcomingQuizzes() {
    const [pastQuizzes, setPastQuizzes] = useState<any[]>([]);
    const [upcomingQuizzes, setUpcomingQuizzes] = useState<any[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const past = await fetchPastQuizzes();
                const upcoming = await fetchUpcomingQuizzes();

                setPastQuizzes(past);
                setUpcomingQuizzes(upcoming);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);


  return (
    <ParallaxScrollView
    headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    headerImage={
      <Image
        source={require('@/assets/images/partial-react-logo.png')}
        style={styles.reactLogo}
      />
    }>
    {/* Past Quizzes */}
    <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Past Quizzes</ThemedText>
        {pastQuizzes.length > 0 ? (
          pastQuizzes.map((quiz, index) => (
            <ThemedText key={index}>
              {quiz.title} - {new Date(quiz.date).toDateString()}
              {'\n'}Winners: {quiz.winners?.join(', ') || 'N/A'}
              {'\n'}Finalists: {quiz.finalists?.join(', ') || 'N/A'}
              {'\n'}Participants: {quiz.participants?.join(', ') || 'N/A'}
            </ThemedText>
          ))
        ) : (
          <ThemedText>No past quizzes available.</ThemedText>
        )}
      </ThemedView>

      {/* Upcoming Quizzes */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Upcoming Quizzes</ThemedText>
        {upcomingQuizzes.length > 0 ? (
          upcomingQuizzes.map((quiz, index) => (
            <ThemedText key={index}>
              {quiz.title} - {new Date(quiz.date).toDateString()}
              {'\n'}QMs: {quiz.QMs?.join(', ') || 'N/A'}
              {'\n'}Registration Link: {quiz.registration_link}
            </ThemedText>
          ))
        ) : (
          <ThemedText>No upcoming quizzes available.</ThemedText>
        )}
      </ThemedView>
    </ParallaxScrollView>

  );
}


const styles = StyleSheet.create({
    stepContainer: {
      gap: 8,
      marginBottom: 8,
    },
    reactLogo: {
      height: 178,
      width: 290,
      bottom: 0,
      left: 0,
      position: 'absolute',
    },
});