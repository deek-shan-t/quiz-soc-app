import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

import { fetchLeaderboard } from '@/lib/api';

export default function LeaderboardChart() {
    const [leaderboard, setLeaderboard] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const leader = await fetchLeaderboard();

                leader.sort((a, b) => new Date(a.quiz_date).getTime() - new Date(b.quiz_date).getTime());

                setLeaderboard(leader);
                console.log(leader);

                let cumulativeScores = {
                    Mordor: 0,
                    Rivendell: 0,
                    HelmsDeep: 0,
                    Edoras: 0,
                };

                const formattedData = leader.map((entry) => {
                    cumulativeScores.Mordor += entry.Mordor;
                    cumulativeScores.Rivendell += entry.Rivendell;
                    cumulativeScores.HelmsDeep += entry.HelmsDeep;
                    cumulativeScores.Edoras += entry.Edoras;

                    return {
                        date: new Date(entry.quiz_date).toDateString(),
                        Mordor: cumulativeScores.Mordor,
                        Rivendell: cumulativeScores.Rivendell,
                        HelmsDeep: cumulativeScores.HelmsDeep,
                        Edoras: cumulativeScores.Edoras,
                    };
                });

                setLeaderboard(formattedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }
        , []);

    if (loading) {
        return <ActivityIndicator size="large" />;
    }

    return (
        <View style={{ padding: 20, backgroundColor: "#fff" }}>

        </View>
    );
}
