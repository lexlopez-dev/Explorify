package com.explorify.post;

import com.explorify.user.User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PostSecurityService {

    PostRepository postRepository;

    public PostSecurityService(PostRepository postRepository) {
        super();
        this.postRepository = postRepository;
    }

    public boolean isAllowedToDelete(long postId, User loggedInUser) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        if(optionalPost.isPresent()) {
            Post inDB = optionalPost.get();
            return inDB.getUser().getId() == loggedInUser.getId();
        }
        return false;
    }
}
