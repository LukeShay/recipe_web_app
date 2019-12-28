package com.lukeshay.restapi.gym;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.google.gson.Gson;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.domain.Persistable;
import org.springframework.data.mongodb.core.mapping.Document;

/** The type Gym. */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document
class Gym implements Persistable<String> {
  @Id private String id;

  @CreatedDate
  @JsonProperty(access = Access.WRITE_ONLY)
  private String createdDate;

  @LastModifiedDate
  @JsonProperty(access = Access.WRITE_ONLY)
  private String modifiedDate;

  @JsonProperty(access = Access.WRITE_ONLY)
  private boolean persistable;

  private String name;
  private String address;
  private String city;
  private String state;
  private String website;
  private String email;
  private String phoneNumber;
  private List<String> authorizedEditors;

  public Gym(
      String name,
      String address,
      String city,
      String state,
      String website,
      String email,
      String phoneNumber,
      List<String> authorizedEditors) {
    this.name = name;
    this.address = address;
    this.city = city;
    this.state = state;
    this.website = website;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.authorizedEditors = authorizedEditors;
  }

  @Override
  public boolean isNew() {
    return false;
  }

  @Override
  public boolean equals(Object obj) {
    return obj instanceof Gym && toString().equals(obj.toString());
  }

  @Override
  public String toString() {
    return new Gson().toJson(this);
  }
}
