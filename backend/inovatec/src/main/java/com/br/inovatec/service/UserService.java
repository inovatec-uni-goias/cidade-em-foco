package com.br.inovatec.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.br.inovatec.entity.User;
import com.br.inovatec.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public List<User> listAllUsers() {
        return userRepository.findAll();
    }

    public User findUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário inexistente"));

        return user;

    }

    public User updateUser(Long id, User userUpdates) {
        if (userRepository.existsById(id)) {
            User user = findUserById(id);

            user.setDateOfBirth(userUpdates.getDateOfBirth());
            user.setName(userUpdates.getName());
            user.setLastName(userUpdates.getLastName());

            return userRepository.save(user);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Não foi possível atualizar as informações: Usuário inexistente");
        }

    }

    public void deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Não foi possível deletar: Usuário inexistente");
        }

    }

}
