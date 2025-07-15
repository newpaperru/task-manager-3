import React from "react";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import InboxIcon from "@mui/icons-material/Inbox";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

import type { TaskChipsProps } from "@shared/types/types";

export const TaskChips = React.memo(
    ({ category, priority, status }: TaskChipsProps) => {
        return (
            <Stack direction="row" spacing={1}>
                <Chip
                    icon={
                        <InboxIcon
                            sx={{
                                "@media (max-width: 802px)": {
                                    width: "16px",
                                },
                            }}
                        />
                    }
                    label={category}
                    variant="outlined"
                    sx={{
                        fontSize: "16px",
                        "@media (max-width: 802px)": {
                            fontSize: "12px",
                            height: "100%",
                            lineHeight: "1",
                        },
                    }}
                />
                <Chip
                    icon={
                        <PriorityHighIcon
                            sx={{
                                "@media (max-width: 802px)": {
                                    width: "16px",
                                },
                            }}
                        />
                    }
                    label={priority}
                    variant="outlined"
                    sx={{
                        fontSize: "16px",
                        "@media (max-width: 802px)": {
                            fontSize: "12px",
                            height: "100%",
                            lineHeight: "1",
                        },
                    }}
                />
                <Chip
                    icon={
                        <TrackChangesIcon
                            sx={{
                                "@media (max-width: 802px)": {
                                    width: "16px",
                                },
                            }}
                        />
                    }
                    label={status}
                    variant="outlined"
                    sx={{
                        fontSize: "16px",
                        "@media (max-width: 802px)": {
                            fontSize: "12px",
                            height: "100%",
                            lineHeight: "1",
                        },
                    }}
                />
            </Stack>
        );
    }
);
