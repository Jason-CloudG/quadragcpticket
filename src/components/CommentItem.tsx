
import { useState } from "react";
import { Comment } from "@/lib/ticketData";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

interface CommentItemProps {
  comment: Comment;
}

export function CommentItem({ comment }: CommentItemProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const getInitials = (email: string) => {
    const name = email.split('@')[0];
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <p className="text-base leading-relaxed whitespace-pre-wrap">
          {comment.content}
        </p>
      </CardContent>
      <CardFooter className="border-t pt-3 pb-3 flex justify-between">
        <div className="flex items-center">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarFallback className="text-xs">{getInitials(comment.author)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{comment.author}</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {formatDate(comment.createdAt)}
        </span>
      </CardFooter>
    </Card>
  );
}
