import React from 'react';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextMisinformationIcon from '@mui/icons-material/WarningAmber';
import TextOkIcon from '@mui/icons-material/CheckCircleOutline';
import { getUserHistory } from '../api/api';
import { UserHistoryItem } from '../api/apiTypes';
import cyrb53 from '../util/hash';

interface UserHistoryProps {
  user: string;
}

function UserHistory(props: UserHistoryProps) {
  const [entries, setEntries] = React.useState<UserHistoryItem[]>([]);
  const [selectedEntry, setSelectedEntry] = React.useState(-1);

  const { user } = props;

  React.useEffect(() => {
    async function fetchEntries() {
      const request = { user };
      const response = await getUserHistory(request);
      setEntries(response.history);
    }
    fetchEntries();
  }, [user]);

  const handleHistoryItemClick = (idx: number) => {
    if (selectedEntry === idx) {
      setSelectedEntry(-1);
    } else {
      setSelectedEntry(idx);
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{ height: '100%', boxShadow: 'none' }}
      data-testid="user-history-parent"
    >
      <List
        dense
        disablePadding
        sx={{ overflow: 'auto', height: '100%' }}
        subheader={
          <ListSubheader
            key="listheaderkey"
            sx={{ backgroundColor: 'rgb(229, 246, 253)', color: '#014361' }}
          >
            <Typography sx={{ lineHeight: 'unset', fontWeight: 'bold' }}>
              Past queries
            </Typography>
          </ListSubheader>
        }
      >
        {entries.map((entry, idx) => (
          <div key={cyrb53(JSON.stringify(entry), idx)}>
            <ListItemButton
              onClick={() => handleHistoryItemClick(idx)}
              data-testid="user-history-entry"
            >
              <ListItemIcon>
                {entry.valid ? (
                  <TextOkIcon data-testid="text-ok-icon" />
                ) : (
                  <TextMisinformationIcon data-testid="text-misinformation-icon" />
                )}
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  sx: {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: selectedEntry === idx ? '-1' : '5',
                    WebkitBoxOrient: 'vertical',
                    cursor: 'pointer',
                  },
                }}
                primary={entry.text}
                secondary={
                  entry.valid ? 'Not misinformation' : 'Misinformation'
                }
              />
            </ListItemButton>
            <Divider variant="middle" component="li" />
          </div>
        ))}
      </List>
    </Card>
  );
}

export default UserHistory;
