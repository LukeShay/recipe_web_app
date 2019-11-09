package io.lukeshay.restapi.todo;

import com.google.gson.Gson;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;

import java.util.Date;

/**
 * The type Todo.
 */
public class Todo {
	@Id
	private String id;
	private String createdDate;
	private String modifiedDate;
	private String userId;
	private String text;
	private boolean completed;

	/**
	 * Instantiates a new Todo.
	 *
	 * @param userId    the user id
	 * @param text      the text
	 * @param completed the completed
	 */
	public Todo(String userId, String text, boolean completed) {
		this.userId = userId;
		this.text = text;
		this.completed = completed;
		this.createdDate = new Date().toString();
		this.modifiedDate = new Date().toString();
	}

	/**
	 * Gets id.
	 *
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * Sets id.
	 *
	 * @param id the id
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * Gets user id.
	 *
	 * @return the user id
	 */
	public String getUserId() {
		return userId;
	}

	/**
	 * Sets user id.
	 *
	 * @param userId the user id
	 */
	public void setUserId(String userId) {
		this.userId = userId;
	}

	/**
	 * Gets text.
	 *
	 * @return the text
	 */
	public String getText() {
		return text;
	}

	/**
	 * Sets text.
	 *
	 * @param text the text
	 */
	public void setText(String text) {
		this.text = text;
	}

	/**
	 * Is completed boolean.
	 *
	 * @return the boolean
	 */
	public boolean isCompleted() {
		return completed;
	}

	/**
	 * Sets completed.
	 *
	 * @param completed the completed
	 */
	public void setCompleted(boolean completed) {
		this.completed = completed;
	}

	/**
	 * Update.
	 *
	 * @param updatedTodo the updated todo
	 */
	public void update(Todo updatedTodo) {
		if (updatedTodo.getText() != null) {
			this.text = updatedTodo.getText();
		}

		this.completed = updatedTodo.isCompleted();
	}

	/**
	 * Gets created date.
	 *
	 * @return the created date
	 */
	public String getCreatedDate() {
		return createdDate;
	}

	/**
	 * Sets created date.
	 *
	 * @param createdDate the created date
	 */
	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}

	/**
	 * Gets modified date.
	 *
	 * @return the modified date
	 */
	public String getModifiedDate() {
		return modifiedDate;
	}

	/**
	 * Sets modified date.
	 *
	 * @param modifiedDate the modified date
	 */
	public void setModifiedDate(String modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	@Override
	public String toString() {
		return new Gson().toJson(this);
	}
}