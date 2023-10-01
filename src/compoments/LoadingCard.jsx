import React, {Component} from 'react';
import {Card, Skeleton} from "@nextui-org/react";

class LoadingCard extends Component {
    render() {
        return (
            <div style={{
                height : this.props.height,
                width : this.props.width
            }}>
                <Card className="w-[200px] space-y-5 p-4" radius="2xl">
                    <Skeleton className="rounded-lg">
                        <div className="h-24 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <div className="space-y-3">
                        <Skeleton className="w-3/5 rounded-lg">
                            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-4/5 rounded-lg">
                            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-2/5 rounded-lg">
                            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                        </Skeleton>
                    </div>
                </Card>
            </div>
        );
    }
}

export default LoadingCard;