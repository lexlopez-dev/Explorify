package com.explorify.post;

import com.explorify.post.vm.PostVM;
import com.explorify.shared.CurrentUser;
import com.explorify.shared.GenericResponse;
import com.explorify.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/1.0")
public class PostController {

    @Autowired
    PostService postService;

    @PostMapping("/posts")
    PostVM createPost(@Valid @RequestBody Post post, @CurrentUser User user) {
        return new PostVM(postService.save(user, post));
    }

    @GetMapping("/posts")
    Page<PostVM> getAllPosts(Pageable pageable) {
        return postService.getAllPosts(pageable).map(PostVM::new);
    }

    @GetMapping("/users/{username}/posts")
    Page<PostVM> getPostsOfUser (@PathVariable String username, Pageable pageable) {
        return postService.getPostsOfUser(username, pageable).map(PostVM::new);
    }


    @GetMapping({"/posts/{id:[0-9]+}", "/users/{username}/posts/{id:[0-9]+}"})
    ResponseEntity<?> getPostsRelative(@PathVariable long id,
                                       @PathVariable(required=false) String username,
                                       Pageable pageable,
                                       @RequestParam(name="direction", defaultValue = "after") String direction,
                                       @RequestParam(name="count", defaultValue ="false", required = false) boolean count ) {
        if(!direction.equalsIgnoreCase("after")) {
            return ResponseEntity.ok(postService.getOldPosts(id, username, pageable).map(PostVM::new));
        }

        if(count == true) {
            long newPostCount = postService.getNewPostsCount(id, username);
            return ResponseEntity.ok(Collections.singletonMap("count", newPostCount));
        }
        List<PostVM> newPosts =
                postService.getNewPosts(id, username, pageable).stream().map(PostVM::new).collect(Collectors.toList());
        return ResponseEntity.ok(newPosts);
    }

    @DeleteMapping("/posts/{id:[0-9]+}")
    @PreAuthorize("@postSecurityService.isAllowedToDelete(#id, principal)")
    GenericResponse deletePost(@PathVariable long id) {
        postService.deletePost(id);
        return new GenericResponse("Post is removed");
    }

}

